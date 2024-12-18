import { loggerService } from '../../logger.service';
import type { ImprovementAction } from '../../../types';
import type { ProcessorContext, ProcessorServices, Processor } from '../types';

export class ImprovementProcessor implements Processor {
  constructor(private readonly services: ProcessorServices) {}

  async process(improvement: ImprovementAction): Promise<ProcessorContext> {
    const context: ProcessorContext = {
      improvement,
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

export function createImprovementProcessor(services: ProcessorServices): ImprovementProcessor {
  return new ImprovementProcessor(services);
}