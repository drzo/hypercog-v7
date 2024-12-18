import type { SystemState } from '../../../types';

export interface PerformanceAnalysis {
  shouldOptimize: boolean;
  degradationRatio?: number;
}

export function analyzePerformance(current: SystemState, previous: SystemState | null): PerformanceAnalysis {
  if (!previous) return { shouldOptimize: false };
  
  const degradationRatio = current.metrics.responseTime / previous.metrics.responseTime;
  return {
    shouldOptimize: degradationRatio > 1.2,
    degradationRatio
  };
}