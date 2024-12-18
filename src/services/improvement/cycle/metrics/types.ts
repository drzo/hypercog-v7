export interface MetricsResult {
  memory: {
    heapUsageRatio: number;
    heapFragmentation: number;
  };
  performance: {
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
  timestamp: string;
}

export interface MetricsComparison {
  memory: {
    heapUsageChange: number;
    uptimeChange: number;
  };
  performance: {
    responseTimeChange: number;
    errorRateChange: number;
    throughputChange: number;
  };
  timestamp: string;
}

export interface MetricsThresholds {
  memory: {
    maxHeapUsage: number;
    maxFragmentation: number;
  };
  performance: {
    maxResponseTime: number;
    maxErrorRate: number;
    minThroughput: number;
  };
}