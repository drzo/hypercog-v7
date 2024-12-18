import type { SystemState } from '../../../../types';
import type { PerformanceMetrics } from '../metrics/performance';
import { createPerformanceOptimization } from '../../optimizations/performance';

export const PERFORMANCE_THRESHOLDS = {
  RESPONSE_TIME_RATIO: 1.2,
  ERROR_RATE_CHANGE: 0.05,
  THROUGHPUT_CHANGE: -0.1
};

export function evaluatePerformanceRules(
  state: SystemState, 
  metrics: PerformanceMetrics
) {
  const improvements = [];

  if (metrics.responseTimeRatio > PERFORMANCE_THRESHOLDS.RESPONSE_TIME_RATIO) {
    improvements.push(createPerformanceOptimization(state, {
      reason: 'High response time',
      priority: calculatePriority(metrics.responseTimeRatio)
    }));
  }

  if (metrics.errorRateChange > PERFORMANCE_THRESHOLDS.ERROR_RATE_CHANGE) {
    improvements.push(createPerformanceOptimization(state, {
      reason: 'Increasing error rate',
      priority: calculatePriority(metrics.errorRateChange * 2)
    }));
  }

  return improvements;
}

function calculatePriority(ratio: number): number {
  return Math.min(Math.floor(ratio * 8), 10);
}