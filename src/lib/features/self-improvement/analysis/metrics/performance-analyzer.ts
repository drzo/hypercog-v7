import type { SystemState } from '../../types/state';
import type { ImprovementAction } from '../../types/improvement';
import { loggerService } from '$lib/features/core/services';

export class PerformanceAnalyzer {
  private readonly RESPONSE_TIME_THRESHOLD = 200; // 200ms
  private readonly ERROR_RATE_THRESHOLD = 0.01; // 1%

  analyze(currentState: SystemState, previousState: SystemState | null): ImprovementAction[] {
    const improvements: ImprovementAction[] = [];
    
    try {
      this.analyzeResponseTime(currentState, improvements);
      this.analyzeErrorRate(currentState, improvements);
      this.analyzeThroughput(currentState, previousState, improvements);

      return improvements;
    } catch (error) {
      loggerService.error('Performance analysis failed', error);
      return [];
    }
  }

  private analyzeResponseTime(state: SystemState, improvements: ImprovementAction[]): void {
    if (state.metrics.responseTime > this.RESPONSE_TIME_THRESHOLD) {
      improvements.push({
        id: crypto.randomUUID(),
        type: 'code',
        description: 'Optimize response time',
        priority: this.calculatePriority(state.metrics.responseTime / this.RESPONSE_TIME_THRESHOLD),
        estimatedImpact: 8,
        changes: [
          {
            path: 'src/lib/features/core/services/request-handler.ts',
            before: null,
            after: {
              // Suggested performance optimizations
              cacheEnabled: true,
              compressionEnabled: true
            }
          }
        ]
      });
    }
  }

  private analyzeErrorRate(state: SystemState, improvements: ImprovementAction[]): void {
    if (state.metrics.errorRate > this.ERROR_RATE_THRESHOLD) {
      improvements.push({
        id: crypto.randomUUID(),
        type: 'code',
        description: 'Reduce error rate',
        priority: 9,
        estimatedImpact: 9,
        changes: [
          {
            path: 'src/lib/features/core/utils/error-handling.ts',
            before: null,
            after: {
              // Suggested error handling improvements
              retryEnabled: true,
              maxRetries: 3,
              retryDelay: 1000
            }
          }
        ]
      });
    }
  }

  private analyzeThroughput(
    currentState: SystemState,
    previousState: SystemState | null,
    improvements: ImprovementAction[]
  ): void {
    if (previousState && currentState.metrics.throughput < previousState.metrics.throughput * 0.8) {
      improvements.push({
        id: crypto.randomUUID(),
        type: 'code',
        description: 'Improve throughput',
        priority: 7,
        estimatedImpact: 7,
        changes: [
          {
            path: 'src/lib/features/core/services/request-queue.ts',
            before: null,
            after: {
              // Suggested throughput optimizations
              batchSize: 10,
              concurrency: 3
            }
          }
        ]
      });
    }
  }

  private calculatePriority(ratio: number): number {
    return Math.min(Math.floor(ratio * 5), 10);
  }
}

export const performanceAnalyzer = new PerformanceAnalyzer();