import type { ImprovementAction } from '../../types';

export interface TriggerService {
  scheduleImprovementCycle(): Promise<void>;
}

export interface ProcessorContext {
  improvement: ImprovementAction;
  success: boolean;
  error?: Error;
  metrics?: {
    before: Record<string, number>;
    after: Record<string, number>;
  };
}

export interface ProcessorServices {
  githubService: any;
  noteService: any;
  improvementService: any;
}

export interface Processor {
  process(improvement: ImprovementAction): Promise<ProcessorContext>;
}