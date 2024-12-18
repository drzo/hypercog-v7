import type { ImprovementResult } from '../../../types';
import { createCycleServices } from './factory';
import { createStrategy } from './strategies/factory';
import { createCycleLogger } from './logger';
import { createCycleExecutor } from './executor';
import { createMetricsCollector } from './metrics/collector';
import { loggerService } from '../../logger.service';
import type { Env } from '../../../types';

export class ImprovementCycle {
  private readonly services;
  private readonly strategy;
  private readonly logger;
  private readonly executor;
  private readonly metrics;

  constructor(env: Env) {
    this.services = createCycleServices(env);
    this.strategy = createStrategy(process.env.IMPROVEMENT_STRATEGY);
    this.logger = createCycleLogger();
    this.executor = createCycleExecutor(env);
    this.metrics = createMetricsCollector();
  }

  async execute(): Promise<ImprovementResult> {
    try {
      // Get latest Note2Self
      const latestNote = await this.services.noteService.getLatestNote();
      this.logger.logStart(latestNote);

      // Get current and previous states
      const [currentState, previousState] = await Promise.all([
        this.services.stateService.getCurrentState(),
        this.services.stateService.getPreviousState()
      ]);

      // Analyze system using selected strategy
      const improvements = await this.strategy.analyze(currentState, previousState);
      this.logger.logEvaluation(improvements);

      // Execute improvements
      for (const improvement of improvements) {
        await this.executor.executeImprovement(improvement);
      }

      const result = {
        currentState,
        previousState,
        improvements,
        timestamp: new Date().toISOString()
      };

      this.logger.logCompletion(result);
      return result;
    } catch (error) {
      this.logger.logError(error as Error);
      throw error;
    }
  }
}

export function createImprovementCycle(env: Env): ImprovementCycle {
  return new ImprovementCycle(env);
}

export * from './types';