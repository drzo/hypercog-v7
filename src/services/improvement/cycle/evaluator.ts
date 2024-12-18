import type { CycleContext } from './types';
import { loggerService } from '../../logger.service';
import { IMPROVEMENT_THRESHOLDS } from '../constants';

export class CycleEvaluator {
  async evaluate(context: CycleContext): Promise<void> {
    try {
      if (!context.success) {
        await this.handleFailure(context);
        return;
      }

      const metrics = this.compareMetrics(context.beforeState, context.afterState);
      const isImproved = this.determineImprovement(metrics);

      loggerService.info('Improvement evaluation completed', {
        improvement: context.improvement.id,
        metrics,
        isImproved
      });
    } catch (error) {
      loggerService.error('Cycle evaluation failed', error);
      throw error;
    }
  }

  private compareMetrics(before: SystemState, after: SystemState) {
    return {
      memoryUsage: this.calculateMemoryChange(before.metrics, after.metrics),
      responseTime: this.calculateResponseTimeChange(before.metrics, after.metrics),
      errorRate: this.calculateErrorRateChange(before.metrics, after.metrics),
      throughput: this.calculateThroughputChange(before.metrics, after.metrics)
    };
  }

  private calculateMemoryChange(before: SystemState['metrics'], after: SystemState['metrics']) {
    return {
      heapUsage: (after.memoryUsage.heapUsed / after.memoryUsage.heapTotal) -
                 (before.memoryUsage.heapUsed / before.memoryUsage.heapTotal)
    };
  }

  private calculateResponseTimeChange(before: SystemState['metrics'], after: SystemState['metrics']) {
    return (before.responseTime - after.responseTime) / before.responseTime;
  }

  private calculateErrorRateChange(before: SystemState['metrics'], after: SystemState['metrics']) {
    return before.errorRate - after.errorRate;
  }

  private calculateThroughputChange(before: SystemState['metrics'], after: SystemState['metrics']) {
    return (after.throughput - before.throughput) / before.throughput;
  }

  private determineImprovement(metrics: ReturnType<typeof this.compareMetrics>): boolean {
    // Consider improvement successful if any metric improved without significant degradation
    const improvements = [
      metrics.memoryUsage.heapUsage < 0,
      metrics.responseTime > 0,
      metrics.errorRate < 0,
      metrics.throughput > 0
    ];

    const degradations = [
      metrics.memoryUsage.heapUsage > IMPROVEMENT_THRESHOLDS.MEMORY.MAX_HEAP_USAGE_INCREASE,
      metrics.responseTime < -IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_RESPONSE_TIME_INCREASE,
      metrics.errorRate > IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_ERROR_RATE_INCREASE,
      metrics.throughput < -IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_THROUGHPUT_DECREASE
    ];

    return improvements.some(Boolean) && !degradations.some(Boolean);
  }

  private async handleFailure(context: CycleContext): Promise<void> {
    loggerService.error('Improvement failed', {
      error: context.error,
      improvement: context.improvement
    });
  }
}

export function createCycleEvaluator(): CycleEvaluator {
  return new CycleEvaluator();
}
