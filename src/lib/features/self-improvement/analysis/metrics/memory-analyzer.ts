import type { SystemState } from '../../types/state';
import type { ImprovementAction } from '../../types/improvement';
import { loggerService } from '$lib/features/core/services';

export class MemoryAnalyzer {
  private readonly MEMORY_THRESHOLD = 0.85; // 85% memory usage threshold

  analyze(currentState: SystemState, previousState: SystemState | null): ImprovementAction[] {
    const improvements: ImprovementAction[] = [];
    
    try {
      const { heapUsed, heapTotal } = currentState.metrics.memoryUsage;
      const memoryUsageRatio = heapUsed / heapTotal;

      if (memoryUsageRatio > this.MEMORY_THRESHOLD) {
        improvements.push({
          id: crypto.randomUUID(),
          type: 'code',
          description: 'Optimize memory usage',
          priority: this.calculatePriority(memoryUsageRatio),
          estimatedImpact: this.estimateImpact(memoryUsageRatio),
          changes: [
            {
              path: 'src/lib/features/core/services/cache.service.ts',
              before: null,
              after: {
                // Suggested cache optimization
                maxSize: Math.floor(heapTotal * 0.1),
                cleanupInterval: 300000
              }
            }
          ]
        });
      }

      return improvements;
    } catch (error) {
      loggerService.error('Memory analysis failed', error);
      return [];
    }
  }

  private calculatePriority(usageRatio: number): number {
    return Math.min(Math.floor(usageRatio * 10), 10);
  }

  private estimateImpact(usageRatio: number): number {
    return Math.min(Math.floor((usageRatio - this.MEMORY_THRESHOLD) * 20), 10);
  }
}

export const memoryAnalyzer = new MemoryAnalyzer();