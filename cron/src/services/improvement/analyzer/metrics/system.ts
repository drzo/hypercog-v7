import type { SystemState } from '../../../../types';
import { analyzeMemoryMetrics, type MemoryMetrics } from './memory';
import { analyzePerformanceMetrics, type PerformanceMetrics } from './performance';
import { loggerService } from '../../../logger.service';

export interface SystemMetricsAnalysis {
  memory: MemoryMetrics;
  performance: PerformanceMetrics;
  timestamp: string;
}

export async function analyzeSystemMetrics(
  currentState: SystemState,
  previousState: SystemState | null
): Promise<SystemMetricsAnalysis> {
  try {
    // Analyze metrics in parallel for better performance
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
        heapFragmentation: memory.heapFragmentation,
        gcFrequency: memory.gcFrequency
      },
      performance: {
        responseTimeRatio: performance.responseTimeRatio,
        errorRateChange: performance.errorRateChange,
        throughputChange: performance.throughputChange
      }
    });

    return analysis;
  } catch (error) {
    loggerService.error('Failed to analyze system metrics', error);
    throw error;
  }
}