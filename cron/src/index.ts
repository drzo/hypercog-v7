import { ImprovementHandler } from './handlers/improvement.handler';
import { createTriggerService } from './services/trigger/service';
import { loggerService } from './services/logger.service';
import type { Env } from './types';

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    try {
      loggerService.info('Starting scheduled execution', {
        cron: event.cron,
        type: event.type
      });

      // Initialize trigger service and schedule improvement cycle
      const triggerService = createTriggerService(env);
      await triggerService.scheduleImprovementCycle();

      // Handle improvements
      const handler = new ImprovementHandler(env);
      await handler.handle();

      loggerService.info('Scheduled execution completed');
    } catch (error) {
      loggerService.error('Scheduled execution failed', error);
      throw error;
    }
  }
} satisfies ExportedHandler<Env>;