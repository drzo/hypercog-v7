export interface SystemMetrics {
  memoryUsage: NodeJS.MemoryUsage;
  uptime: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
}

export interface SystemConfig {
  version: string;
  environment: string;
  features: string[];
  settings: Record<string, any>;
}

export interface SystemState {
  metrics: SystemMetrics;
  config: SystemConfig;
  timestamp: string;
}