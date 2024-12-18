import type { CycleMonitor, CycleResult } from './types';
import { loggerService } from '../../../logger.service';

export class CycleMonitorImpl implements CycleMonitor {
  private readonly results = new Map<string, CycleResult>();

  startCycle(cycleId: string): void {
    this.results.set(cycleId, {
      cycleId,
      startTime: Date.now(),
      success: false
    });
    loggerService.info('Starting improvement cycle', { cycleId });
  }

  completeCycle(cycleId: string, metrics: Record<string, number>): void {
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

  failCycle(cycleId: string, error: Error): void {
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

  getResults(): CycleResult[] {
    return Array.from(this.results.values());
  }
}

export function createCycleMonitor(): CycleMonitor {
  return new CycleMonitorImpl();
}