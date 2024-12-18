import { TriggerClient } from '@trigger.dev/sdk';
import { loggerService } from '../../logger.service';
import { createImprovementCycle } from '../../improvement/cycle';
export async function setupImprovementCycle(env) {
    const client = new TriggerClient({
        id: env.TRIGGER_DEV,
        apiKey: env.TRIGGER_PAT,
        apiUrl: "https://api.trigger.dev"
    });
    // Schedule improvement cycle every 5 minutes
    await client.defineJob({
        id: "hypercog-improvement-cycle",
        name: "HyperCog Self-Improvement Cycle",
        version: "1.0.0",
        trigger: { type: "cron", cron: "*/5 * * * *" },
        run: async (payload, io, ctx) => {
            try {
                loggerService.info('Starting scheduled improvement cycle');
                const cycle = createImprovementCycle(env);
                const result = await cycle.execute();
                await io.createStatus({
                    label: 'Improvement Cycle',
                    state: 'completed',
                    data: {
                        improvements: result.improvements.length,
                        timestamp: result.timestamp
                    }
                });
                loggerService.info('Completed scheduled improvement cycle', { result });
            }
            catch (error) {
                loggerService.error('Failed to run improvement cycle', error);
                throw error;
            }
        }
    });
    loggerService.info('Improvement cycle scheduled with Trigger.dev');
}
