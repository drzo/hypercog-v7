import type { SystemState } from '../../../../types';

export interface PerformanceMetrics {
  responseTimeRatio: number;
  errorRateChange: number;
  throughputChange: number;
}

export function analyzePerformanceMetrics(current: SystemState, previous: SystemState | null): PerformanceMetrics {
  if (!previous) {
    return {
      responseTimeRatio: 1,
      errorRateChange: 0,
      throughputChange: 0
    };
  }

  return {
    responseTimeRatio: current.metrics.responseTime / previous.metrics.responseTime,
    errorRateChange: current.metrics.errorRate - previous.metrics.errorRate,
    throughputChange: calculateThroughputChange(current, previous)
  };
}

function calculateThroughputChange(current: SystemState, previous: SystemState): number {
  const throughputDiff = current.metrics.throughput - previous.metrics.throughput;
  return throughputDiff / previous.metrics.throughput;
}