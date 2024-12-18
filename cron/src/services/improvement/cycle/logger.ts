import type { CycleContext } from './types';
import { loggerService } from '../../logger.service';

export class CycleLogger {
  logStart(latestNote: any): void {
    loggerService.info('Starting improvement cycle', {
      hasNote: !!latestNote,
      type: latestNote?.type,
      goals: latestNote?.goals?.length
    });
  }

  logEvaluation(improvements: any[]): void {
    loggerService.info('System evaluated', {
      improvements: improvements.length
    });
  }

  logCompletion(contexts: CycleContext[]): void {
    loggerService.info('Improvement cycle completed', {
      total: contexts.length,
      successful: contexts.filter(c => c.success).length,
      failed: contexts.filter(c => !c.success).length,
      metrics: {
        before: contexts[0]?.metrics?.before,
        after: contexts[contexts.length - 1]?.metrics?.after
      }
    });
  }

  logError(error: Error): void {
    loggerService.error('Improvement cycle failed', error);
  }
}

export function createCycleLogger(): CycleLogger {
  return new CycleLogger();
}
