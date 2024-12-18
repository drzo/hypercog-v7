import { createImprovementCycle } from '../services/improvement/cycle';
import { loggerService } from '../services/logger.service';
import type { Env } from '../types';

export class ImprovementHandler {
  private readonly cycle;

  constructor(env: Env) {
    this.cycle = createImprovementCycle(env);
  }

  async handle(): Promise<void> {
    try {
      loggerService.info('Starting improvement cycle');
      await this.cycle.execute();
      loggerService.info('Improvement cycle completed');
    } catch (error) {
      loggerService.error('Improvement cycle failed', error);
      throw error;
    }
  }
}