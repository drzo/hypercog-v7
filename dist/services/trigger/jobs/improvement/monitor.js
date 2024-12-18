import { loggerService } from '../../../logger.service';
export class ImprovementMonitor {
    cycleResults = new Map();
    startCycle(cycleId) {
        this.cycleResults.set(cycleId, {
            startTime: Date.now(),
            success: false
        });
        loggerService.info('Starting improvement cycle', { cycleId });
    }
    completeCycle(cycleId, metrics) {
        const cycle = this.cycleResults.get(cycleId);
        if (cycle) {
            cycle.endTime = Date.now();
            cycle.success = true;
            cycle.metrics = metrics;
            loggerService.info('Completed improvement cycle', {
                cycleId,
                duration: cycle.endTime - cycle.startTime,
                metrics
            });
        }
    }
    failCycle(cycleId, error) {
        const cycle = this.cycleResults.get(cycleId);
        if (cycle) {
            cycle.endTime = Date.now();
            loggerService.error('Failed improvement cycle', {
                cycleId,
                duration: cycle.endTime - cycle.startTime,
                error
            });
        }
    }
    getResults() {
        return Array.from(this.cycleResults.entries()).map(([cycleId, result]) => ({
            cycleId,
            duration: (result.endTime || Date.now()) - result.startTime,
            success: result.success,
            metrics: result.metrics
        }));
    }
}
export function createImprovementMonitor() {
    return new ImprovementMonitor();
}
