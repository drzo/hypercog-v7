import { logger } from '../logger';

export interface PerformanceMetrics {
  timestamp: number;
  duration: number;
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    heapLimit: number;
  };
  marks?: Record<string, number>;
}

export class MetricsCollector {
  private static marks = new Map<string, number>();

  static mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  static measure(startMark: string, endMark: string): number | null {
    const start = this.marks.get(startMark);
    const end = this.marks.get(endMark);

    if (!start || !end) return null;
    return end - start;
  }

  static clearMarks(): void {
    this.marks.clear();
  }

  static async collectMetrics(): Promise<PerformanceMetrics> {
    try {
      const metrics: PerformanceMetrics = {
        timestamp: Date.now(),
        duration: performance.now(),
        marks: Object.fromEntries(this.marks)
      };

      // Add memory metrics if available
      if (performance.memory) {
        metrics.memory = {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          heapLimit: performance.memory.jsHeapSizeLimit
        };
      }

      return metrics;
    } catch (error) {
      logger.error('Failed to collect performance metrics', error);
      throw error;
    }
  }
}

// Export static methods directly
export const {
  mark,
  measure,
  clearMarks,
  collectMetrics
} = MetricsCollector;