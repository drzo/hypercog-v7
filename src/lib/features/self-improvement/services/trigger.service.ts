import { loggerService } from '$lib/features/core/services';
import { improvementService } from './improvement.service';
import { githubService } from './github.service';
import { noteService } from './note.service';

export class TriggerService {
  private readonly triggerKey = process.env.TRIGGER_DEV;

  async scheduleImprovementCycle(): Promise<void> {
    try {
      // Schedule evaluation every few minutes
      await this.createTrigger('evaluate-system', '*/5 * * * *', async () => {
        const result = await improvementService.evaluateSystem();

        for (const improvement of result.improvements) {
          // Create GitHub PR for each improvement
          await githubService.createImprovementPR(improvement);

          // Add Note2Self for tracking
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
        }
      });

      loggerService.info('Scheduled improvement cycle');
    } catch (error) {
      loggerService.error('Failed to schedule improvement cycle', error);
      throw error;
    }
  }

  private async createTrigger(
    name: string,
    schedule: string,
    callback: () => Promise<void>
  ): Promise<void> {
    // TODO: Implement Trigger.dev integration
  }
}

export const triggerService = new TriggerService();