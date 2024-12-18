import type { SystemState } from '../../../types';

export interface MemoryAnalysis {
  shouldOptimize: boolean;
  usageRatio: number;
}

export function analyzeMemoryUsage(state: SystemState): MemoryAnalysis {
  const { heapUsed, heapTotal } = state.metrics.memoryUsage;
  const usageRatio = heapUsed / heapTotal;
  
  return {
    shouldOptimize: usageRatio > 0.85,
    usageRatio
  };
}