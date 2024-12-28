import { TriggerClient } from '@trigger.dev/sdk';
import { OpenAI } from 'openai';
import Anthropic from 'anthropic';
import { Logger } from '../logger.service';
import { EvaluationService } from './evaluation.service';
import { ProposalService, ImprovementProposal } from './proposal.service';
import { ExecutionService, ExecutionResult } from './execution.service';
import path from 'path';
import fs from 'fs/promises';

export class ImprovementCycle {
    private logger: Logger;
    private openai: OpenAI;
    private anthropic: Anthropic;
    private triggerClient: TriggerClient;
    private evaluationService: EvaluationService;
    private proposalService: ProposalService;
    private executionService: ExecutionService;

    constructor() {
        this.logger = new Logger();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY
        });
        this.triggerClient = new TriggerClient({
            id: 'hypercog-v7',
            apiKey: process.env.TRIGGER_DEV
        });
        this.evaluationService = new EvaluationService();
        this.proposalService = new ProposalService();
        this.executionService = new ExecutionService();
    }

    async evaluateCurrentState(): Promise<{
        status: 'success' | 'failure',
        metrics: Record<string, number>,
        recommendations: string[]
    }> {
        this.logger.info('Evaluating current system state');
        return this.evaluationService.evaluateSystemState();
    }

    async proposeImprovement(): Promise<ImprovementProposal> {
        this.logger.info('Generating improvement proposal');
        const evaluation = await this.evaluateCurrentState();
        
        if (evaluation.status === 'success') {
            return this.proposalService.generateProposal(
                evaluation.metrics,
                evaluation.recommendations
            );
        }
        
        return {
            description: '',
            expectedImpact: '',
            implementation: '',
            confidence: 0
        };
    }

    async executeImprovement(implementation: string): Promise<boolean> {
        this.logger.info('Executing improvement');
        const proposal: ImprovementProposal = {
            description: 'Manual improvement execution',
            expectedImpact: 'Unknown',
            implementation,
            confidence: 1 // Manual execution assumes high confidence
        };

        const result = await this.executionService.executeImprovement(proposal);
        return result.success;
    }

    async documentResults(results: {
        evaluation: any;
        proposal: ImprovementProposal;
        success: boolean;
    }): Promise<void> {
        this.logger.info('Documenting improvement results');
        
        // Save results to the analysis directory
        const timestamp = new Date().toISOString();
        const resultsPath = path.join(
            process.cwd(),
            'data',
            'analysis',
            `improvement-${timestamp}.json`
        );

        await fs.mkdir(path.dirname(resultsPath), { recursive: true });
        await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
    }
} 