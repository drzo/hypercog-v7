import type { SystemState } from '../../../../types';
import type { SystemMetricsAnalysis } from './types';
import { analyzeMemoryMetrics } from './memory';
import { analyzePerformanceMetrics } from './performance';
import { loggerService } from '../../../logger.service';

export class MetricsAnalyzer {
  async analyze(
    currentState: SystemState,
    previousState: SystemState | null
  ): Promise<SystemMetricsAnalysis> {
    try {
      const [memory, performance] = await Promise.all([
        analyzeMemoryMetrics(currentState),
        analyzePerformanceMetrics(currentState, previousState)
      ]);

      const analysis = {
        memory,
        performance,
        timestamp: new Date().toISOString()
      };

      loggerService.info('System metrics analyzed', {
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
      loggerService.error('Failed to analyze system metrics', error);
      throw error;
    }
  }
}

export function createMetricsAnalyzer(): MetricsAnalyzer {
  return new MetricsAnalyzer();
}