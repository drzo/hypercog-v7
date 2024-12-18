import type { SystemState } from '../../../../types';
import type { MemoryMetrics } from '../metrics/memory';
import { createMemoryOptimization } from '../../optimizations/memory';

export const MEMORY_THRESHOLDS = {
  HEAP_USAGE: 0.85,
  FRAGMENTATION: 0.3,
  GC_FREQUENCY: 10
};

export function evaluateMemoryRules(state: SystemState, metrics: MemoryMetrics) {
  const improvements = [];

  if (metrics.heapUsageRatio > MEMORY_THRESHOLDS.HEAP_USAGE) {
    improvements.push(createMemoryOptimization(state, {
      reason: 'High heap usage',
      priority: calculatePriority(metrics.heapUsageRatio)
    }));
  }

  if (metrics.heapFragmentation > MEMORY_THRESHOLDS.FRAGMENTATION) {
    improvements.push(createMemoryOptimization(state, {
      reason: 'High heap fragmentation',
      priority: calculatePriority(metrics.heapFragmentation)
    }));
  }

  return improvements;
}

function calculatePriority(ratio: number): number {
  return Math.min(Math.floor(ratio * 10), 10);
}