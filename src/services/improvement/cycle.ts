import type { ImprovementResult } from '../../types';
import { createStateService } from '../state/service';
import { createImprovementService } from './service';
import { createNoteService } from '../note/service';
import { createGitHubService } from '../github';
import { loggerService } from '../logger.service';
import type { Env } from '../../types';

export class ImprovementCycle {
  private readonly stateService;
  private readonly improvementService;
  private readonly noteService;
  private readonly githubService;

  constructor(env: Env) {
    this.stateService = createStateService(env);
    this.improvementService = createImprovementService(env);
    this.noteService = createNoteService(env);
    this.githubService = createGitHubService(env);
  }

  async execute(): Promise<ImprovementResult> {
    try {
      // Get latest Note2Self
      const latestNote = await this.noteService.getLatestNote();
      loggerService.info('Retrieved latest note', {
        hasNote: !!latestNote,
        type: latestNote?.type,
        goals: latestNote?.goals?.length
      });

      // Evaluate system
      const result = await this.improvementService.evaluateSystem(latestNote);
      loggerService.info('System evaluated', {
        improvements: result.improvements.length
      });

      // Process improvements
      for (const improvement of result.improvements) {
        await this.processImprovement(improvement);
      }

      return result;
    } catch (error) {
      loggerService.error('Improvement cycle failed', error);
      throw error;
    }
  }

  private async processImprovement(improvement: ImprovementAction) {
    try {
      // Create GitHub PR
      await this.githubService.createImprovementPR(improvement);
      
      // Document success
      await this.noteService.create.success(improvement);
      
      loggerService.info('Processed improvement successfully', { improvement });
    } catch (error) {
      // Document failure
      await this.noteService.create.failure(improvement, error as Error);
      loggerService.error('Failed to process improvement', { improvement, error });
    }
  }
}

export function createImprovementCycle(env: Env): ImprovementCycle {
  return new ImprovementCycle(env);
}