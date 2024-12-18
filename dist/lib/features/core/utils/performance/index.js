export * from './monitor';
export * from './profiler';
export * from './decorators';
export * from './metrics';
export { profile, memoize } from './decorators';
export { Profiler } from './profiler';
// Initialize and export performance monitor instance
import { PerformanceMonitor } from './monitor';
export const performanceMonitor = PerformanceMonitor.getInstance();
