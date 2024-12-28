import { config } from 'dotenv';
import { Logger } from './services/logger.service';
import { ImprovementCycle } from './services/improvement/cycle.service';
import { TriggerClient } from '@trigger.dev/sdk';

// Load environment variables
config();

const logger = new Logger();

async function main() {
    try {
        logger.info('Starting HyperCog self-improvement system');

        // Initialize Trigger.dev client
        const client = new TriggerClient({
            id: 'hypercog-v7',
            apiKey: process.env.TRIGGER_DEV ?? ''
        });

        // Create improvement cycle instance
        const cycle = new ImprovementCycle();

        // Run initial evaluation
        const evaluation = await cycle.evaluateCurrentState();
        logger.info('Initial system evaluation', evaluation);

        // Generate improvement proposal
        const proposal = await cycle.proposeImprovement();
        logger.info('Generated improvement proposal', proposal);

        // Execute improvement if confidence is high enough
        if (proposal.implementation && proposal.confidence >= 0.7) {
            const success = await cycle.executeImprovement(proposal.implementation);
            logger.info('Improvement execution result', { success });

            // Document results
            await cycle.documentResults({
                evaluation,
                proposal,
                success
            });
        } else {
            logger.warn('Skipping improvement execution - low confidence or no implementation', {
                confidence: proposal.confidence,
                hasImplementation: !!proposal.implementation
            });
        }

        logger.info('HyperCog self-improvement cycle completed');
    } catch (error) {
        logger.error('Error in self-improvement cycle', error instanceof Error ? error : new Error(String(error)));
        process.exit(1);
    }
}

main();