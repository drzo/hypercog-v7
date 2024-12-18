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

export interface ImprovementResult {
  currentState: SystemState;
  previousState: SystemState | null;
  improvements: ImprovementAction[];
  timestamp: string;
}