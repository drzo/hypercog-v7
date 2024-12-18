import type { ImprovementAction, SystemState } from '../../../types';
import { generateImprovementId } from '../utils';

export function createMemoryOptimization(state: SystemState): ImprovementAction {
  return {
    id: generateImprovementId(),
    type: 'code',
    description: 'Optimize memory usage',
    priority: 8,
    estimatedImpact: 7,
    changes: [
      {
        path: 'src/lib/services/cache.service.ts',
        before: null,
        after: {
          maxSize: Math.floor(state.metrics.memoryUsage.heapTotal * 0.1),
          cleanupInterval: 300000
        }
      }
    ]
  };
}