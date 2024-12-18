import { loggerService } from '../../../logger.service';
export class CycleMonitorImpl {
    results = new Map();
    startCycle(cycleId) {
        this.results.set(cycleId, {
            cycleId,
            startTime: Date.now(),
            success: false
        });
        loggerService.info('Starting improvement cycle', { cycleId });
    }
    completeCycle(cycleId, metrics) {
        const result = this.results.get(cycleId);
        if (result) {
            result.endTime = Date.now();
            result.success = true;
            result.metrics = metrics;
            loggerService.info('Completed improvement cycle', {
                cycleId,
                duration: result.endTime - result.startTime,
                metrics
            });
        }
    }
    failCycle(cycleId, error) {
        const result = this.results.get(cycleId);
        if (result) {
            result.endTime = Date.now();
            result.error = error;
            loggerService.error('Failed improvement cycle', {
                cycleId,
                duration: result.endTime - result.startTime,
                error
            });
        }
    }
    getResults() {
        return Array.from(this.results.values());
    }
}
export function createCycleMonitor() {
    return new CycleMonitorImpl();
}
