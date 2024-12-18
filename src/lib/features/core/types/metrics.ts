export interface SystemMetrics {
  memoryUsage: NodeJS.MemoryUsage;
  uptime: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
}