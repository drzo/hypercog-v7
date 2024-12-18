import { createGitHubService } from '../../github';
import { createNoteService } from '../../note/service';
import { loggerService } from '../../logger.service';
export class CycleExecutor {
    githubService;
    noteService;
    constructor(env) {
        this.githubService = createGitHubService(env);
        this.noteService = createNoteService(env);
    }
    async executeImprovement(improvement) {
        try {
            // Create GitHub PR for changes
            await this.githubService.createImprovementPR(improvement);
            // Document success
            await this.noteService.create.success(improvement);
            loggerService.info('Improvement executed successfully', { improvement });
            return true;
        }
        catch (error) {
            // Document failure
            await this.noteService.create.failure(improvement, error);
            loggerService.error('Failed to execute improvement', { improvement, error });
            return false;
        }
    }
}
export function createCycleExecutor(env) {
    return new CycleExecutor(env);
}
