import type { ImprovementResult, Note2Self, ImprovementAction } from '../../../types';

export interface ImprovementCycle {
  execute(): Promise<ImprovementResult>;
}

export interface CycleServices {
  stateService: any;
  improvementService: any;
  noteService: any;
  githubService: any;
}

export interface CycleContext {
  latestNote: Note2Self | null;
  improvements: ImprovementAction[];
  success: boolean;
  error?: Error;
  metrics?: {
    before: Record<string, number>;
    after: Record<string, number>;
  };
}