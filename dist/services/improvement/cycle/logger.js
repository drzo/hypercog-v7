import { loggerService } from '../../logger.service';
export class CycleLogger {
    logStart(latestNote) {
        loggerService.info('Starting improvement cycle', {
            hasNote: !!latestNote,
            type: latestNote?.type,
            goals: latestNote?.goals?.length
        });
    }
    logEvaluation(improvements) {
        loggerService.info('System evaluated', {
            improvements: improvements.length
        });
    }
    logCompletion(result) {
        loggerService.info('Improvement cycle completed', {
            improvements: result.improvements.length,
            metrics: {
                before: result.previousState?.metrics,
                after: result.currentState.metrics
            }
        });
    }
    logError(error) {
        loggerService.error('Improvement cycle failed', error);
    }
}
export function createCycleLogger() {
    return new CycleLogger();
}
