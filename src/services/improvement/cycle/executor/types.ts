import type { ImprovementAction } from '../../../../types';

export interface ExecutionResult {
  success: boolean;
  error?: Error;
  metrics?: Record<string, number>;
}

export interface CycleExecutor {
  executeImprovement(improvement: ImprovementAction): Promise<ExecutionResult>;
}