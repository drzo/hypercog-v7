import { createImprovementCycle } from './services/improvement/cycle';
import { setupTriggerIntegrations } from './services/trigger/setup';
import { loggerService } from './services/logger.service';
async function main() {
    try {
        loggerService.info('Starting HyperCog');
        // Load environment variables
        const env = {
            HYPERCOG_KV: process.env.HYPERCOG_KV,
            IMPROVEMENT_QUEUE: process.env.IMPROVEMENT_QUEUE,
            DB: process.env.DB,
            TRIGGER_DEV: process.env.TRIGGER_DEV,
            TRIGGER_PAT: process.env.TRIGGER_PAT,
            GIT_HUB_API_KEY: process.env.GIT_HUB_API_KEY,
            GIT_HUB_REPO_URL: process.env.GIT_HUB_REPO_URL
        };
        // Set up Trigger.dev integrations
        await setupTriggerIntegrations(env);
        // Initialize improvement cycle
        const cycle = createImprovementCycle(env);
        // Execute initial improvement cycle
        await cycle.execute();
        loggerService.info('HyperCog started successfully');
    }
    catch (error) {
        loggerService.error('Failed to start HyperCog', error);
        process.exit(1);
    }
}
// Run the application
main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
