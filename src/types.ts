export interface Env {
  HYPERCOG_KV: KVNamespace;
  IMPROVEMENT_QUEUE: Queue;
  DB: D1Database;
  TRIGGER_DEV: string;
  TRIGGER_PAT: string;
  GIT_HUB_API_KEY: string;
  GIT_HUB_REPO_URL: string;
}

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

export interface ImprovementAction {
  id: string;
  type: 'code' | 'config' | 'dependency' | 'rollback';
  description: string;
  priority: number;
  estimatedImpact: number;
  changes: {
    path: string;
    before: any;
    after: any;
  }[];
}

export interface Note2Self {
  id: string;
  timestamp: string;
  type: 'improvement' | 'degradation' | 'failure';
  description: string;
  changes: {
    component: string;
    before: any;
    after: any;
  }[];
  metrics?: {
    before: Record<string, number>;
    after: Record<string, number>;
  };
  goals?: {
    type: 'improvement' | 'diagnostics' | 'rollback';
    description: string;
    priority: number;
  }[];
}