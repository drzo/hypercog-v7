import { logger } from '../logger';
import type { PerformanceMetrics } from './types';

class MetricsCollector {
  private marks = new Map<string, number>();

  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  measure(startMark: string, endMark: string): number | null {
    const start = this.marks.get(startMark);
    const end = this.marks.get(endMark);

    if (!start || !end) return null;
    return end - start;
  }

  clearMarks(): void {
    this.marks.clear();
  }

  async collectMetrics(): Promise<PerformanceMetrics> {
    try {
      const metrics: PerformanceMetrics = {
        timestamp: Date.now(),
        duration: performance.now(),
        marks: Object.fromEntries(this.marks)
      };

      if (performance.memory) {
        metrics.memory = {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          heapLimit: performance.memory.jsHeapSizeLimit
        };
      }

      return metrics;
    } catch (error) {
      logger.error('Failed to collect metrics', error);
      throw error;
    }
  }
}

// Export singleton instance
export const metrics = new MetricsCollector();