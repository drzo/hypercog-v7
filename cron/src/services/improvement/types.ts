import type { SystemState, Note2Self } from '../../types';

export interface ImprovementResult {
  currentState: SystemState;
  previousState: SystemState | null;
  improvements: ImprovementAction[];
  timestamp: string;
}

export interface ImprovementService {
  evaluateSystem(latestNote?: Note2Self): Promise<ImprovementResult>;
}

export interface ImprovementProcessor {
  processImprovement(
    improvement: ImprovementAction,
    beforeState: SystemState,
    afterState: SystemState
  ): Promise<void>;
}

export interface ImprovementEvaluator {
  evaluateImprovement(
    improvement: ImprovementAction,
    before: SystemState,
    after: SystemState
  ): Promise<boolean>;
}