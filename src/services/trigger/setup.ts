import { TriggerClient } from '@trigger.dev/sdk';
import { setupImprovementScheduler } from './jobs/improvement/scheduler';
import { setupGitHubRepo } from './github/setup';
import { loggerService } from '../logger.service';
import type { Env } from '../../types';

export async function setupTriggerIntegrations(env: Env): Promise<void> {
  try {
    // Validate required environment variables
    if (!env.TRIGGER_DEV || !env.TRIGGER_PAT) {
      throw new Error('Missing Trigger.dev credentials');
    }
    if (!env.GIT_HUB_API_KEY || !env.GIT_HUB_REPO_URL) {
      throw new Error('Missing GitHub credentials');
    }

    // Set up GitHub repository first
    await setupGitHubRepo(env);

    // Initialize Trigger.dev client
    const client = new TriggerClient({
      id: env.TRIGGER_DEV,
      apiKey: env.TRIGGER_PAT,
      apiUrl: "https://api.trigger.dev"
    });

    // Set up improvement cycle schedulers
    await setupImprovementScheduler(env);

    loggerService.info('Integrations set up successfully');
  } catch (error) {
    loggerService.error('Failed to set up integrations', error);
    throw error;
  }
}