import type { SystemState } from '../../../../../types';
import type { SystemMetricsAnalysis } from '../types';
import { createMemoryMetricsCollector } from './memory';
import { createPerformanceMetricsCollector } from './performance';
import { loggerService } from '../../../../logger.service';

export class MetricsCollector {
  private readonly memoryCollector;
  private readonly performanceCollector;

  constructor() {
    this.memoryCollector = createMemoryMetricsCollector();
    this.performanceCollector = createPerformanceMetricsCollector();
  }

  async collect(
    currentState: SystemState,
    previousState: SystemState | null
  ): Promise<SystemMetricsAnalysis> {
    try {
      const [memory, performance] = await Promise.all([
        this.memoryCollector.collect(currentState),
        this.performanceCollector.collect(currentState, previousState)
      ]);

      const analysis = {
        memory,
        performance,
        timestamp: new Date().toISOString()
      };

      loggerService.info('System metrics collected', {
        memory: {
          heapUsageRatio: memory.heapUsageRatio,
          heapFragmentation: memory.heapFragmentation
        },
        performance: {
          responseTimeRatio: performance.responseTimeRatio,
          errorRateChange: performance.errorRateChange
        }
      });

      return analysis;
    } catch (error) {
      loggerService.error('Failed to collect system metrics', error);
      throw error;
    }
  }
}

export function createMetricsCollector(): MetricsCollector {
  return new MetricsCollector();
}