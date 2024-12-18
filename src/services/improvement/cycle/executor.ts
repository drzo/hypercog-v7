import type { ImprovementAction, Note2Self } from '../../../types';
import { createGitHubService } from '../../github';
import { createNoteService } from '../../note/service';
import { loggerService } from '../../logger.service';
import type { Env } from '../../../types';

export class CycleExecutor {
  private readonly githubService;
  private readonly noteService;

  constructor(env: Env) {
    this.githubService = createGitHubService(env);
    this.noteService = createNoteService(env);
  }

  async executeImprovement(improvement: ImprovementAction): Promise<boolean> {
    try {
      // Create GitHub PR for changes
      await this.githubService.createImprovementPR(improvement);
      
      // Document success
      await this.noteService.create.success(improvement);
      
      loggerService.info('Improvement executed successfully', { improvement });
      return true;
    } catch (error) {
      // Document failure
      await this.noteService.create.failure(improvement, error as Error);
      loggerService.error('Failed to execute improvement', { improvement, error });
      return false;
    }
  }
}

export function createCycleExecutor(env: Env): CycleExecutor {
  return new CycleExecutor(env);
}