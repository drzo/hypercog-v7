import type { ImprovementAction, Note2Self } from '../../types';
import { createGitHubService } from '../github';
import { createNoteService } from '../note/service';
import { createImprovementEvaluator } from './evaluator';
import { loggerService } from '../logger.service';
import type { Env } from '../../types';

export class ImprovementProcessor {
  private readonly githubService;
  private readonly noteService;
  private readonly evaluator;

  constructor(env: Env) {
    this.githubService = createGitHubService(env);
    this.noteService = createNoteService(env);
    this.evaluator = createImprovementEvaluator();
  }

  async processImprovement(
    improvement: ImprovementAction,
    beforeState: any,
    afterState: any
  ): Promise<void> {
    try {
      // Create GitHub PR
      await this.githubService.createImprovementPR(improvement);
      
      // Evaluate results
      const isImproved = await this.evaluator.evaluateImprovement(
        improvement,
        beforeState,
        afterState
      );

      // Document results
      if (isImproved) {
        await this.documentSuccess(improvement, beforeState, afterState);
      } else {
        await this.documentDegradation(improvement, beforeState, afterState);
      }

      loggerService.info('Processed improvement successfully', { 
        improvement,
        isImproved
      });
    } catch (error) {
      await this.documentFailure(improvement, error);
      loggerService.error('Failed to process improvement', { improvement, error });
      throw error;
    }
  }

  private async documentSuccess(improvement: ImprovementAction, before: any, after: any) {
    await this.noteService.create.success(improvement);
  }

  private async documentDegradation(improvement: ImprovementAction, before: any, after: any) {
    await this.noteService.create.degradation(improvement, {
      before: before.metrics,
      after: after.metrics
    });
  }

  private async documentFailure(improvement: ImprovementAction, error: Error) {
    await this.noteService.create.failure(improvement, error);
  }
}

export function createImprovementProcessor(env: Env): ImprovementProcessor {
  return new ImprovementProcessor(env);
}