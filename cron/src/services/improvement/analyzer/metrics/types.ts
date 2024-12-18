export interface MemoryMetrics {
  heapUsageRatio: number;
  heapFragmentation: number;
  gcFrequency: number;
}

export interface PerformanceMetrics {
  responseTimeRatio: number;
  errorRateChange: number;
  throughputChange: number;
}

export interface SystemMetricsAnalysis {
  memory: MemoryMetrics;
  performance: PerformanceMetrics;
  timestamp: string;
}