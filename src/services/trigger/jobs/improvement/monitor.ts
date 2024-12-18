import { loggerService } from '../../../logger.service';
import type { ImprovementAction } from '../../../../types';

export class ImprovementMonitor {
  private readonly cycleResults: Map<string, {
    startTime: number;
    endTime?: number;
    success: boolean;
    metrics?: Record<string, number>;
  }> = new Map();

  startCycle(cycleId: string): void {
    this.cycleResults.set(cycleId, {
      startTime: Date.now(),
      success: false
    });
    loggerService.info('Starting improvement cycle', { cycleId });
  }

  completeCycle(cycleId: string, metrics: Record<string, number>): void {
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

  failCycle(cycleId: string, error: Error): void {
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

  getResults(): Array<{
    cycleId: string;
    duration: number;
    success: boolean;
    metrics?: Record<string, number>;
  }> {
    return Array.from(this.cycleResults.entries()).map(([cycleId, result]) => ({
      cycleId,
      duration: (result.endTime || Date.now()) - result.startTime,
      success: result.success,
      metrics: result.metrics
    }));
  }
}

export function createImprovementMonitor(): ImprovementMonitor {
  return new ImprovementMonitor();
}