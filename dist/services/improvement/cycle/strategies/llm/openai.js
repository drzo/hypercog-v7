import { LLMStrategy } from './base';
import { loggerService } from '../../../../logger.service';
export class OpenAIStrategy extends LLMStrategy {
    name = 'openai';
    apiKey = process.env.OPENAI_API_KEY;
    async getStrategicGuidance(currentState, previousState) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a system optimization expert. Analyze the system state and metrics to suggest concrete improvements.'
                        },
                        {
                            role: 'user',
                            content: `Current system state:\n${this.formatSystemState(currentState)}\n\nMetrics comparison:\n${this.formatMetricsComparison(currentState, previousState)}`
                        }
                    ],
                    temperature: 0.2,
                    max_tokens: 1000
                })
            });
            const data = await response.json();
            const suggestions = this.parseResponse(data.choices[0].message.content);
            loggerService.info('OpenAI strategic guidance received', { suggestions });
            return suggestions;
        }
        catch (error) {
            loggerService.error('OpenAI API request failed', error);
            return [];
        }
    }
    parseResponse(content) {
        try {
            return JSON.parse(content);
        }
        catch {
            loggerService.error('Failed to parse OpenAI response');
            return [];
        }
    }
}
