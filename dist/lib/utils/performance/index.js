export * from './metrics';
export * from './monitor';
export * from './profiler';
export * from './decorators';
// Initialize performance monitor
import { PerformanceMonitor } from './monitor';
export const performanceMonitor = PerformanceMonitor.getInstance();
