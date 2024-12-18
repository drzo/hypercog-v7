export * from './monitor';
export * from './profiler';
export * from './decorators';
export * from './metrics';

// Re-export commonly used types and functions
export type { PerformanceMetrics, PerformanceThresholds } from './monitor';
export { profile, memoize } from './decorators';
export { Profiler } from './profiler';

// Initialize and export performance monitor instance
import { PerformanceMonitor } from './monitor';
export const performanceMonitor = PerformanceMonitor.getInstance();