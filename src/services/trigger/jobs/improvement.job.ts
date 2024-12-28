import { TriggerClient, eventTrigger, cronTrigger } from '@trigger.dev/sdk';
import { ImprovementCycle } from '../../improvement/cycle.service';

export function createImprovementJob(client: TriggerClient) {
    // Create improvement cycle job that runs every 5 minutes
    client.defineJob({
        id: 'improvement-cycle-1',
        name: 'HyperCog Improvement Cycle 1',
        version: '0.0.1',
        trigger: cronTrigger({
            cron: '*/5 * * * *' // Every 5 minutes
        }),
        run: async (payload, io) => {
            const cycle = new ImprovementCycle();
            
            // Step 1: Evaluate current state
            const evaluation = await cycle.evaluateCurrentState();
            await io.logger.info('Current state evaluation', evaluation);

            // Step 2: Propose improvement if needed
            if (evaluation.status === 'success') {
                const proposal = await cycle.proposeImprovement();
                await io.logger.info('Improvement proposal', proposal);

                // Step 3: Execute improvement
                if (proposal.implementation) {
                    const success = await cycle.executeImprovement(proposal.implementation);
                    await io.logger.info('Improvement execution', { success });

                    // Step 4: Document results
                    await cycle.documentResults({
                        evaluation,
                        proposal,
                        success
                    });
                }
            }

            return {
                evaluation,
                timestamp: new Date().toISOString()
            };
        }
    });
} 