import { loggerService } from '../../logger.service';
export class CycleProcessor {
    services;
    constructor(services) {
        this.services = services;
    }
    async process(improvement) {
        // Get initial state
        const beforeState = await this.services.stateService.getCurrentState();
        const context = {
            improvement,
            beforeState,
            afterState: beforeState, // Will be updated after changes
            success: false
        };
        try {
            // Create GitHub PR
            await this.services.githubService.createImprovementPR(improvement);
            // Get updated state after changes
            context.afterState = await this.services.stateService.getCurrentState();
            // Document success
            await this.services.noteService.create.success(improvement);
            context.success = true;
            loggerService.info('Processed improvement successfully', { improvement });
        }
        catch (error) {
            // Document failure
            context.error = error;
            await this.services.noteService.create.failure(improvement, error);
            loggerService.error('Failed to process improvement', { improvement, error });
        }
        return context;
    }
}
export function createCycleProcessor(services) {
    return new CycleProcessor(services);
}
