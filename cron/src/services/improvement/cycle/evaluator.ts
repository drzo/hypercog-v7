import type { CycleContext } from './types';
import { loggerService } from '../../logger.service';

export class CycleEvaluator {
  async evaluate(context: CycleContext): Promise<void> {
    try {
      if (!context.success) {
        await this.handleFailure(context);
        return;
      }

      await this.handleSuccess(context);
    } catch (error) {
      loggerService.error('Cycle evaluation failed', error);
      throw error;
    }
  }

  private async handleSuccess(context: CycleContext): Promise<void> {
    const { metrics } = context;
    if (!metrics?.before || !metrics?.after) return;

    const improvements = this.calculateImprovements(metrics);
    
    loggerService.info('Cycle succeeded', {
      improvements,
      metrics: {
        before: metrics.before,
        after: metrics.after
      }
    });
  }

  private async handleFailure(context: CycleContext): Promise<void> {
    loggerService.error('Cycle failed', {
      error: context.error,
      metrics: context.metrics
    });
  }

  private calculateImprovements(metrics: CycleContext['metrics']): Record<string, number> {
    if (!metrics?.before || !metrics?.after) return {};

    return Object.keys(metrics.before).reduce((acc, key) => {
      acc[key] = ((metrics.after![key] - metrics.before![key]) / metrics.before![key]) * 100;
      return acc;
    }, {} as Record<string, number>);
  }
}

export function createCycleEvaluator(): CycleEvaluator {
  return new CycleEvaluator();
}
