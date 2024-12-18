import type { SystemState } from '../../../../../types';
import type { MemoryMetrics, PerformanceMetrics, SystemMetricsAnalysis } from '../types';

export interface MetricsCollector<T> {
  collect(state: SystemState): Promise<T>;
}

export interface SystemMetricsCollector {
  collect(
    currentState: SystemState,
    previousState: SystemState | null
  ): Promise<SystemMetricsAnalysis>;
}

export interface MemoryMetricsCollector extends MetricsCollector<MemoryMetrics> {}
export interface PerformanceMetricsCollector extends MetricsCollector<PerformanceMetrics> {}