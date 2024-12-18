import type { ImprovementAction } from '../../../../types';
import type { ProcessorContext, ProcessorServices } from '../types';
import { createGitHubProcessor } from './github';
import { createNoteProcessor } from './note';
import { createImprovementValidator } from './validator';
import { createImprovementEvaluator } from './evaluator';
import { createMetricsCollector } from './metrics';
import { loggerService } from '../../../logger.service';

export class ImprovementProcessor {
  private readonly githubProcessor;
  private readonly noteProcessor;
  private readonly validator;
  private readonly evaluator;
  private readonly metricsCollector;

  constructor(private readonly services: ProcessorServices) {
    this.githubProcessor = createGitHubProcessor(services.githubService);
    this.noteProcessor = createNoteProcessor(services.noteService);
    this.validator = createImprovementValidator();
    this.evaluator = createImprovementEvaluator();
    this.metricsCollector = createMetricsCollector();
  }

  async process(improvement: ImprovementAction): Promise<ProcessorContext> {
    const context: ProcessorContext = {
      improvement,
      success: false
    };

    try {
      // Validate improvement
      const errors = this.validator.validate(improvement);
      if (errors.length) {
        throw new Error(`Invalid improvement: ${errors.join(', ')}`);
      }

      // Collect initial metrics
      context.metrics = {
        before: await this.metricsCollector.collect()
      };

      // Process GitHub changes
      await this.githubProcessor.process(improvement);
      
      // Document success
      await this.noteProcessor.success(improvement);

      // Collect final metrics
      context.metrics.after = await this.metricsCollector.collect();
      
      // Evaluate results
      context.success = true;
      await this.evaluator.evaluate(context);

      loggerService.info('Processed improvement successfully', { improvement });
    } catch (error) {
      // Document failure
      context.error = error as Error;
      await this.noteProcessor.failure(improvement, error as Error);
      loggerService.error('Failed to process improvement', { improvement, error });
    }

    return context;
  }
}

export function createImprovementProcessor(services: ProcessorServices): ImprovementProcessor {
  return new ImprovementProcessor(services);
}