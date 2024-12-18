import type { ImprovementAction } from '../../../../types';

export interface ImprovementContext {
  improvement: ImprovementAction;
  success: boolean;
  error?: Error;
  metrics?: {
    before: Record<string, number>;
    after: Record<string, number>;
  };
}

export interface ImprovementServices {
  githubService: any;
  noteService: any;
  improvementService: any;
}

export interface ImprovementProcessor {
  process(improvement: ImprovementAction): Promise<ImprovementContext>;
}