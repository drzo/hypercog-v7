import type { ImprovementAction, SystemState } from '../../../types';
import { generateImprovementId } from '../utils';

export function createPerformanceOptimization(state: SystemState): ImprovementAction {
  return {
    id: generateImprovementId(),
    type: 'code',
    description: 'Optimize response time',
    priority: 7,
    estimatedImpact: 6,
    changes: [
      {
        path: 'src/lib/services/request-handler.ts',
        before: null,
        after: {
          cacheEnabled: true,
          compressionEnabled: true
        }
      }
    ]
  };
}