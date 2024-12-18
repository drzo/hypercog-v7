import type { ImprovementResult } from '../../../types';
import type { ImprovementCycle } from './types';
import { createCycleServices } from './factory';
import { createCycleProcessor } from './processor';
import { createCycleLogger } from './logger';
import { createCycleMetrics } from './metrics';
import { createCycleValidator } from './validator';
import { createCycleEvaluator } from './evaluator';
import type { Env } from '../../../types';

export class ImprovementCycleService implements ImprovementCycle {
  private readonly services;
  private readonly processor;
  private readonly logger;
  private readonly metrics;
  private readonly validator;
  private readonly evaluator;

  constructor(env: Env) {
    this.services = createCycleServices(env);
    this.processor = createCycleProcessor(this.services);
    this.logger = createCycleLogger();
    this.metrics = createCycleMetrics();
    this.validator = createCycleValidator();
    this.evaluator = createCycleEvaluator();
  }

  async execute(): Promise<ImprovementResult> {
    try {
      // 1. Get latest Note2Self
      const latestNote = await this.services.noteService.getLatestNote();
      this.logger.logStart(latestNote);

      // 2. Evaluate system
      const result = await this.services.improvementService.evaluateSystem(latestNote);
      this.logger.logEvaluation(result.improvements);

      // 3. Process improvements
      const contexts = await this.processor.process(
        result.improvements,
        latestNote
      );

      // 4. Log completion
      this.logger.logCompletion(contexts);

      return result;
    } catch (error) {
      this.logger.logError(error as Error);
      throw error;
    }
  }
}

export function createImprovementCycle(env: Env): ImprovementCycle {
  return new ImprovementCycleService(env);
}
