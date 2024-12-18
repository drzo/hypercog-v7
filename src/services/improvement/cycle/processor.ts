import type { ImprovementAction, SystemState } from '../../../types';
import type { CycleContext, CycleServices } from './types';
import { loggerService } from '../../logger.service';

export class CycleProcessor {
  constructor(private readonly services: CycleServices) {}

  async process(improvement: ImprovementAction): Promise<CycleContext> {
    // Get initial state
    const beforeState = await this.services.stateService.getCurrentState();

    const context: CycleContext = {
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
