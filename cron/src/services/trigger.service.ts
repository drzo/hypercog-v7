import { loggerService } from '$lib/features/core/services';
import { improvementService } from './improvement.service';
import { githubService } from './github.service';
import { noteService } from './note.service';
import { TriggerClient } from '@trigger.dev/sdk';

export class TriggerService {
  private readonly client: TriggerClient;

  constructor() {
    this.client = new TriggerClient({
      id: process.env.TRIGGER_DEV,
      apiKey: process.env.TRIGGER_PAT,
      apiUrl: "https://api.trigger.dev"
    });
  }

  async scheduleImprovementCycle(): Promise<void> {
    try {
      await this.client.defineJob({
        id: "hypercog-improvement-cycle",
        name: "HyperCog Self-Improvement Cycle",
        version: "1.0.0",
        trigger: { type: "cron", cron: "*/5 * * * *" }, // Every 5 minutes
        run: async (payload, io) => {
          // 1. Get latest Note2Self
          const latestNote = await noteService.getLatestNote();
          
          // 2. Evaluate system and generate improvements
          const result = await improvementService.evaluateSystem();

          // 3. Create GitHub PR for each improvement
          for (const improvement of result.improvements) {
            try {
              await githubService.createImprovementPR(improvement);

              // 4. Add Note2Self for tracking
              await noteService.addNote({
                type: 'improvement',
                description: improvement.description,
                changes: improvement.changes.map(c => ({
                  component: c.path,
                  before: c.before,
                  after: c.after
                })),
                goals: [{
                  type: 'improvement',
                  description: `Implement ${improvement.description}`,
                  priority: improvement.priority
                }]
              });

              loggerService.info('Created improvement PR', { improvement });
            } catch (error) {
              // Document failure
              await noteService.addNote({
                type: 'failure',
                description: `Failed to implement improvement: ${improvement.description}`,
                changes: improvement.changes.map(c => ({
                  component: c.path,
                  before: c.before,
                  after: c.after
                })),
                goals: [{
                  type: 'diagnostics',
                  description: `Fix implementation of: ${improvement.description}`,
                  priority: improvement.priority
                }]
              });

              loggerService.error('Failed to create improvement PR', error);
            }
          }
        }
      });

      loggerService.info('Scheduled improvement cycle');
    } catch (error) {
      loggerService.error('Failed to schedule improvement cycle', error);
      throw error;
    }
  }
}

export const triggerService = new TriggerService();