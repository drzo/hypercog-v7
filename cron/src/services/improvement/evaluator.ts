import type { SystemState, ImprovementAction } from '../../types';
import { loggerService } from '../logger.service';

export class ImprovementEvaluator {
  async evaluateImprovement(
    improvement: ImprovementAction,
    before: SystemState,
    after: SystemState
  ): Promise<boolean> {
    try {
      const metrics = this.compareMetrics(before, after);
      const isImproved = this.determineImprovement(metrics);

      loggerService.info('Improvement evaluation completed', {
        improvement: improvement.id,
        metrics,
        isImproved
      });

      return isImproved;
    } catch (error) {
      loggerService.error('Failed to evaluate improvement', error);
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
      metrics.memoryUsage.heapUsage > 0.1,
      metrics.responseTime < -0.1,
      metrics.errorRate > 0.01,
      metrics.throughput < -0.1
    ];

    return improvements.some(Boolean) && !degradations.some(Boolean);
  }
}

export function createImprovementEvaluator(): ImprovementEvaluator {
  return new ImprovementEvaluator();
}