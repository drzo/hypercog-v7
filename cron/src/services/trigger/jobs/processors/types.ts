import type { ImprovementAction } from '../../../../types';

export interface ProcessorContext {
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
  process(
    improvement: ImprovementAction,
    services: ProcessorServices
  ): Promise<ProcessorContext>;
}