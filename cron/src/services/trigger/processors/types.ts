import type { ImprovementAction } from '../../../types';

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

export interface Processor<T> {
  process(item: T): Promise<ProcessorContext>;
}