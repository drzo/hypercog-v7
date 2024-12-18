import type { ImprovementAction, Note2Self } from '../../../types';
import type { CycleServices, CycleContext } from './types';
import { loggerService } from '../../logger.service';

export class CycleProcessor {
  constructor(private readonly services: CycleServices) {}

  async process(improvements: ImprovementAction[], latestNote?: Note2Self): Promise<CycleContext[]> {
    const contexts: CycleContext[] = [];

    for (const improvement of improvements) {
      const context = await this.processImprovement(improvement, latestNote);
      contexts.push(context);
    }

    return contexts;
  }

  private async processImprovement(
    improvement: ImprovementAction,
    latestNote?: Note2Self
  ): Promise<CycleContext> {
    const context: CycleContext = {
      latestNote: latestNote || null,
      improvements: [improvement],
      success: false
    };

    try {
      // Create GitHub PR
      await this.services.githubService.createImprovementPR(improvement);
      
      // Document success
      await this.services.noteService.create.success(improvement);
      
      context.success = true;
      loggerService.info('Processed improvement successfully', { improvement });
    } catch (error) {
      // Document failure
      context.error = error as Error;
      await this.services.noteService.create.failure(improvement, error as Error);
      loggerService.error('Failed to process improvement', { improvement, error });
    }

    return context;
  }
}

export function createCycleProcessor(services: CycleServices): CycleProcessor {
  return new CycleProcessor(services);
}