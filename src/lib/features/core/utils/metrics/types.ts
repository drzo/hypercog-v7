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

export interface MetricsThresholds {
  duration?: number;
  heapUsage?: number;
}