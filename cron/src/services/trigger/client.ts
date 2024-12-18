import { TriggerClient } from '@trigger.dev/sdk';
import { loggerService } from '../logger.service';
import type { Env } from '../../types';

export function createTriggerClient(env: Env): TriggerClient {
  if (!env.TRIGGER_DEV || !env.TRIGGER_PAT) {
    throw new Error('Missing Trigger.dev credentials');
  }

  try {
    return new TriggerClient({
      id: env.TRIGGER_DEV,
      apiKey: env.TRIGGER_PAT,
      apiUrl: "https://api.trigger.dev"
    });
  } catch (error) {
    loggerService.error('Failed to create Trigger client', error);
    throw error;
  }
}