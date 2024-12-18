import type { ImprovementResult } from '../../../types';
import type { ImprovementCycle } from './types';
import { createCycleServices } from './factory';
import { createCycleProcessor } from './processor';
import { loggerService } from '../../logger.service';
import type { Env } from '../../../types';

export class ImprovementCycleImpl implements ImprovementCycle {
  private readonly services;
  private readonly processor;

  constructor(env: Env) {
    this.services = createCycleServices(env);
    this.processor = createCycleProcessor(this.services);
  }

  async execute(): Promise<ImprovementResult> {
    try {
      // 1. Get latest Note2Self to understand current goals
      const latestNote = await this.services.noteService.getLatestNote();
      loggerService.info('Retrieved latest note', {
        hasNote: !!latestNote,
        type: latestNote?.type,
        goals: latestNote?.goals?.length
      });

      // 2. Evaluate system and generate improvements
      const result = await this.services.improvementService.evaluateSystem(latestNote);
      loggerService.info('System evaluated', {
        improvements: result.improvements.length
      });

      // 3. Process improvements
      const contexts = await this.processor.process(result.improvements, latestNote);

      // 4. Log results
      loggerService.info('Improvement cycle completed', {
        total: contexts.length,
        successful: contexts.filter(c => c.success).length,
        failed: contexts.filter(c => !c.success).length
      });

      return result;
    } catch (error) {
      loggerService.error('Improvement cycle failed', error);
      throw error;
    }
  }
}

export function createImprovementCycle(env: Env): ImprovementCycle {
  return new ImprovementCycleImpl(env);
}

export * from './types';
export * from './processor';
export * from './factory';