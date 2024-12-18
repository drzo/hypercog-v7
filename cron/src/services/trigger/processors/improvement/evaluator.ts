import type { ImprovementAction } from '../../../../types';
import type { ProcessorContext } from '../types';
import { loggerService } from '../../../logger.service';

export class ImprovementEvaluator {
  async evaluate(context: ProcessorContext): Promise<void> {
    try {
      if (!context.success) {
        await this.handleFailure(context);
        return;
      }

      await this.handleSuccess(context);
    } catch (error) {
      loggerService.error('Improvement evaluation failed', error);
      throw error;
    }
  }

  private async handleSuccess(context: ProcessorContext): Promise<void> {
    loggerService.info('Improvement succeeded', {
      improvement: context.improvement,
      metrics: context.metrics
    });
  }

  private async handleFailure(context: ProcessorContext): Promise<void> {
    loggerService.error('Improvement failed', {
      improvement: context.improvement,
      error: context.error
    });
  }
}

export function createImprovementEvaluator(): ImprovementEvaluator {
  return new ImprovementEvaluator();
}