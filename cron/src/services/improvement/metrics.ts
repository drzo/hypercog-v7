import type { SystemState } from '../../types';

export function analyzeMemoryUsage(state: SystemState): {
  shouldOptimize: boolean;
  usageRatio: number;
} {
  const { heapUsed, heapTotal } = state.metrics.memoryUsage;
  const usageRatio = heapUsed / heapTotal;
  return {
    shouldOptimize: usageRatio > 0.85,
    usageRatio
  };
}

export function analyzePerformance(current: SystemState, previous: SystemState | null): {
  shouldOptimize: boolean;
  degradationRatio?: number;
} {
  if (!previous) return { shouldOptimize: false };
  
  const degradationRatio = current.metrics.responseTime / previous.metrics.responseTime;
  return {
    shouldOptimize: degradationRatio > 1.2,
    degradationRatio
  };
}