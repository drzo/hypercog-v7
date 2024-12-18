import { TriggerClient } from '@trigger.dev/sdk';
import { loggerService } from '../../../logger.service';
import { createImprovementCycle } from '../../../improvement/cycle';
import { createImprovementMonitor } from './monitor';
import type { Env } from '../../../../types';

export async function setupImprovementScheduler(env: Env) {
  const client = new TriggerClient({
    id: env.TRIGGER_DEV,
    apiKey: env.TRIGGER_PAT,
    apiUrl: "https://api.trigger.dev"
  });

  const monitor = createImprovementMonitor();

  // Schedule default strategy cycle
  await client.defineJob({
    id: "hypercog-improvement-cycle-default",
    name: "HyperCog Default Strategy Cycle",
    version: "1.0.0",
    trigger: { type: "cron", cron: "*/5 * * * *" },
    run: async (payload, io) => {
      const cycleId = `default-${Date.now()}`;
      monitor.startCycle(cycleId);

      try {
        const cycle = createImprovementCycle(env);
        const result = await cycle.execute();

        monitor.completeCycle(cycleId, {
          improvements: result.improvements.length,
          memoryUsage: result.currentState.metrics.memoryUsage.heapUsed / result.currentState.metrics.memoryUsage.heapTotal,
          responseTime: result.currentState.metrics.responseTime
        });

        await io.createStatus({
          label: 'Default Strategy Cycle',
          state: 'completed',
          data: { cycleId, result }
        });
      } catch (error) {
        monitor.failCycle(cycleId, error);
        throw error;
      }
    }
  });

  // Schedule alternative strategy cycle
  await client.defineJob({
    id: "hypercog-improvement-cycle-alternative",
    name: "HyperCog Alternative Strategy Cycle",
    version: "1.0.0",
    trigger: { type: "cron", cron: "*/5 * * * *" },
    run: async (payload, io) => {
      const cycleId = `alternative-${Date.now()}`;
      monitor.startCycle(cycleId);

      try {
        process.env.IMPROVEMENT_STRATEGY = 'alternative';
        const cycle = createImprovementCycle(env);
        const result = await cycle.execute();

        monitor.completeCycle(cycleId, {
          improvements: result.improvements.length,
          memoryUsage: result.currentState.metrics.memoryUsage.heapUsed / result.currentState.metrics.memoryUsage.heapTotal,
          responseTime: result.currentState.metrics.responseTime
        });

        await io.createStatus({
          label: 'Alternative Strategy Cycle',
          state: 'completed',
          data: { cycleId, result }
        });
      } catch (error) {
        monitor.failCycle(cycleId, error);
        throw error;
      }
    }
  });

  loggerService.info('Improvement cycles scheduled with Trigger.dev');
}