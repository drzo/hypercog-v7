import { loggerService } from '../../logger.service';
import { createImprovementService } from '../../improvement';
import { createGitHubService } from '../../github';
import { createNoteService } from '../../note';
import { processImprovement } from './processors/improvement';
import type { Env } from '../../../types';
import type { ImprovementCycleContext } from '../types';

export async function improvementCycle(payload: any, io: any, env: Env): Promise<void> {
  const improvementService = createImprovementService(env);
  const githubService = createGitHubService(env);
  const noteService = createNoteService(env);

  try {
    // 1. Get latest Note2Self to understand current goals
    const latestNote = await noteService.getLatestNote();
    
    // 2. Evaluate system and generate improvements based on latest note
    const result = await improvementService.evaluateSystem(latestNote);

    // 3. Process improvements
    for (const improvement of result.improvements) {
      const context = await processImprovement(
        improvement,
        { githubService, noteService }
      );

      // Report progress to Trigger.dev
      await io.createStatus({
        label: improvement.description,
        state: context.success ? 'success' : 'failure',
        data: context
      });
    }
  } catch (error) {
    loggerService.error('Improvement cycle failed', error);
    throw error;
  }
}