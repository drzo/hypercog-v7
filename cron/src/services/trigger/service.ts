import { TriggerClient } from '@trigger.dev/sdk';
import { loggerService } from '../logger.service';
import { createJobRegistry } from './jobs/registry';
import type { TriggerService } from './types';
import type { Env } from '../../types';

export class TriggerServiceImpl implements TriggerService {
  private readonly client: TriggerClient;
  private readonly registry;

  constructor(env: Env) {
    if (!env.TRIGGER_DEV || !env.TRIGGER_PAT) {
      throw new Error('Missing Trigger.dev credentials');
    }

    this.client = new TriggerClient({
      id: env.TRIGGER_DEV,
      apiKey: env.TRIGGER_PAT,
      apiUrl: "https://api.trigger.dev"
    });

    this.registry = createJobRegistry(env);
  }

  async scheduleImprovementCycle(): Promise<void> {
    try {
      // Register all jobs from registry
      const jobs = this.registry.getJobs();
      for (const job of jobs) {
        await this.client.defineJob({
          ...job,
          run: async (payload, io) => {
            await job.run({ 
              payload, 
              io, 
              env: this.registry.getEnv() 
            });
          }
        });
      }

      loggerService.info('Scheduled improvement cycle', {
        jobCount: jobs.length
      });
    } catch (error) {
      loggerService.error('Failed to schedule improvement cycle', error);
      throw error;
    }
  }
}

export function createTriggerService(env: Env): TriggerService {
  return new TriggerServiceImpl(env);
}