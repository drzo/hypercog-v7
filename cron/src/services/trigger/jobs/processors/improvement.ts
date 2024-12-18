import { loggerService } from '../../../logger.service';
import type { ImprovementAction } from '../../../../types';
import type { ImprovementCycleContext } from '../../types';

interface Services {
  githubService: any;
  noteService: any;
}

export async function processImprovement(
  improvement: ImprovementAction,
  services: Services
): Promise<ImprovementCycleContext> {
  const context: ImprovementCycleContext = {
    improvement,
    success: false
  };

  try {
    // Create GitHub PR for improvement
    await services.githubService.createImprovementPR(improvement);
    
    // Document success
    await services.noteService.create.success(improvement);
    
    context.success = true;
    loggerService.info('Processed improvement successfully', { improvement });
  } catch (error) {
    // Document failure
    context.error = error as Error;
    await services.noteService.create.failure(improvement, error as Error);
    loggerService.error('Failed to process improvement', { improvement, error });
  }

  return context;
}