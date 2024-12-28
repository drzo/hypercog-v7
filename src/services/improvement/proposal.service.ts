import { OpenAI } from 'openai';
import Anthropic from 'anthropic';
import { Logger } from '../logger.service';
import { SystemMetrics } from './evaluation.service';

export interface ImprovementProposal {
    description: string;
    expectedImpact: string;
    implementation: string;
    confidence: number;
}

export class ProposalService {
    private logger: Logger;
    private openai: OpenAI;
    private anthropic: Anthropic;

    constructor() {
        this.logger = new Logger();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY
        });
    }

    async generateProposal(metrics: SystemMetrics, recommendations: string[]): Promise<ImprovementProposal> {
        try {
            // First get a proposal from OpenAI
            const openAIProposal = await this.generateOpenAIProposal(metrics, recommendations);
            
            // Then validate it with Anthropic
            const validatedProposal = await this.validateWithAnthropic(openAIProposal);
            
            return validatedProposal;
        } catch (error) {
            this.logger.error('Failed to generate improvement proposal', error);
            return {
                description: '',
                expectedImpact: '',
                implementation: '',
                confidence: 0
            };
        }
    }

    private async generateOpenAIProposal(
        metrics: SystemMetrics,
        recommendations: string[]
    ): Promise<ImprovementProposal> {
        const prompt = `Based on the following system metrics and recommendations:
Metrics:
- Performance Score: ${metrics.performanceScore}
- Reliability Score: ${metrics.reliabilityScore}
- Improvement Rate: ${metrics.improvementRate}

Recommendations:
${recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

Generate a specific improvement proposal with:
1. A clear description of the improvement
2. Expected impact on system metrics
3. Detailed implementation steps in a format that can be executed
4. Confidence score (0-1) in the proposal's success

Format the response as JSON with keys: description, expectedImpact, implementation, confidence`;

        const completion = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are an AI system optimization expert. Generate specific, actionable improvement proposals."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7
        });

        return JSON.parse(completion.choices[0].message.content);
    }

    private async validateWithAnthropic(proposal: ImprovementProposal): Promise<ImprovementProposal> {
        const prompt = `Review this system improvement proposal:
${JSON.stringify(proposal, null, 2)}

Validate:
1. Is the implementation specific and executable?
2. Are the expected impacts realistic?
3. Is the confidence score justified?

If any issues are found, provide corrections. Otherwise, confirm the proposal.
Format response as JSON matching the input structure.`;

        const message = await this.anthropic.messages.create({
            model: "claude-2",
            max_tokens: 1000,
            messages: [{
                role: "user",
                content: prompt
            }]
        });

        try {
            // Extract JSON from Claude's response
            const jsonMatch = message.content[0].text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const validatedProposal = JSON.parse(jsonMatch[0]);
                return {
                    ...proposal,
                    ...validatedProposal,
                    confidence: Math.min(proposal.confidence, validatedProposal.confidence ?? proposal.confidence)
                };
            }
        } catch (error) {
            this.logger.warn('Failed to parse Claude validation response', error);
        }

        return proposal;
    }
} 