import { loggerService } from '../../logger.service';
import type { ImprovementResult } from '../../../types';
import type { Note2Self } from '../../../types';

export class CycleLogger {
  logStart(latestNote: Note2Self | null): void {
    loggerService.info('Starting improvement cycle', {
      hasNote: !!latestNote,
      type: latestNote?.type,
      goals: latestNote?.goals?.length
    });
  }

  logEvaluation(improvements: ImprovementResult['improvements']): void {
    loggerService.info('System evaluated', {
      improvements: improvements.length
    });
  }

  logCompletion(result: ImprovementResult): void {
    loggerService.info('Improvement cycle completed', {
      improvements: result.improvements.length,
      metrics: {
        before: result.previousState?.metrics,
        after: result.currentState.metrics
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