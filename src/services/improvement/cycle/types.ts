import type { SystemState, ImprovementAction, Note2Self } from '../../../types';

export interface ImprovementCycle {
  execute(): Promise<ImprovementResult>;
}

export interface ImprovementResult {
  currentState: SystemState;
  previousState: SystemState | null;
  improvements: ImprovementAction[];
  timestamp: string;
}

export interface CycleContext {
  improvement: ImprovementAction;
  beforeState: SystemState;
  afterState: SystemState;
  success: boolean;
  error?: Error;
}

export interface CycleServices {
  stateService: any;
  improvementService: any;
  noteService: any;
  githubService: any;
}
