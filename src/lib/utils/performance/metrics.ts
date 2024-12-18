export interface PerformanceMetrics {
  timestamp: number;
  duration: number;
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
  };
  marks?: Record<string, number>;
}

export class PerformanceMetrics {
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

  static getMetrics(): PerformanceMetrics {
    const metrics: PerformanceMetrics = {
      timestamp: Date.now(),
      duration: performance.now(),
      marks: Object.fromEntries(this.marks)
    };

    if (performance.memory) {
      metrics.memory = {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize
      };
    }

    return metrics;
  }
}