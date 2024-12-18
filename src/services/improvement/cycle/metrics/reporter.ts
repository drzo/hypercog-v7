import type { SystemState } from '../../../../types';
import { loggerService } from '../../../logger.service';

export class MetricsReporter {
  reportStateComparison(current: SystemState, previous: SystemState | null): void {
    if (!previous) {
      this.reportCurrentState(current);
      return;
    }

    const memoryChange = this.calculateMemoryChange(current, previous);
    const performanceChange = this.calculatePerformanceChange(current, previous);

    loggerService.info('System metrics comparison', {
      memory: memoryChange,
      performance: performanceChange,
      timestamp: current.timestamp
    });
  }

  private reportCurrentState(state: SystemState): void {
    loggerService.info('Current system metrics', {
      memory: {
        heapUsage: state.metrics.memoryUsage.heapUsed / state.metrics.memoryUsage.heapTotal,
        uptime: state.metrics.uptime
      },
      performance: {
        responseTime: state.metrics.responseTime,
        errorRate: state.metrics.errorRate,
        throughput: state.metrics.throughput
      },
      timestamp: state.timestamp
    });
  }

  private calculateMemoryChange(current: SystemState, previous: SystemState): Record<string, number> {
    const currentRatio = current.metrics.memoryUsage.heapUsed / current.metrics.memoryUsage.heapTotal;
    const previousRatio = previous.metrics.memoryUsage.heapUsed / previous.metrics.memoryUsage.heapTotal;

    return {
      heapUsageChange: ((currentRatio - previousRatio) / previousRatio) * 100,
      uptimeChange: current.metrics.uptime - previous.metrics.uptime
    };
  }

  private calculatePerformanceChange(current: SystemState, previous: SystemState): Record<string, number> {
    return {
      responseTimeChange: ((current.metrics.responseTime - previous.metrics.responseTime) / previous.metrics.responseTime) * 100,
      errorRateChange: current.metrics.errorRate - previous.metrics.errorRate,
      throughputChange: ((current.metrics.throughput - previous.metrics.throughput) / previous.metrics.throughput) * 100
    };
  }
}

export function createMetricsReporter(): MetricsReporter {
  return new MetricsReporter();
}