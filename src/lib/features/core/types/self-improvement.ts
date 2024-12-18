export interface SystemState {
  performance: {
    memoryUsage: NodeJS.MemoryUsage;
    uptime: number;
  };
  configuration: Record<string, any>;
  timestamp: string;
}

export interface ImprovementResult {
  currentState: SystemState;
  previousState: SystemState | null;
  improvements: Array<{
    type: string;
    description: string;
    priority: number;
    estimatedImpact: number;
  }>;
  timestamp: string;
}

export interface Note2Self {
  id: string;
  timestamp: string;
  type: 'improvement' | 'degradation' | 'failure';
  description: string;
  changes: Array<{
    component: string;
    before: any;
    after: any;
  }>;
  metrics?: {
    before: Record<string, number>;
    after: Record<string, number>;
  };
  goals?: Array<{
    type: 'improvement' | 'diagnostics' | 'rollback';
    description: string;
    priority: number;
  }>;
}