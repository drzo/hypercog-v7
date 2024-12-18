import { loggerService } from '../../logger.service';
import { createImprovementService } from '../../improvement';
import { createGitHubService } from '../../github';
import { createNoteService } from '../../note';
import { createImprovementProcessor } from '../processors';
import type { Env } from '../../../types';
import type { JobContext } from './types';

export async function improvementJob(context: JobContext): Promise<void> {
  const { env, io } = context;

  // Initialize services
  const improvementService = createImprovementService(env);
  const githubService = createGitHubService(env);
  const noteService = createNoteService(env);

  // Create processor
  const processor = createImprovementProcessor({
    githubService,
    noteService,
    improvementService
  });

  try {
    // Get latest Note2Self
    const latestNote = await noteService.getLatestNote();
    
    // Evaluate system
    const result = await improvementService.evaluateSystem(latestNote);

    // Process improvements
    for (const improvement of result.improvements) {
      const processorContext = await processor.process(improvement);

      // Report progress
      await io.createStatus({
        label: improvement.description,
        state: processorContext.success ? 'success' : 'failure',
        data: processorContext
      });
    }
  } catch (error) {
    loggerService.error('Improvement job failed', error);
    throw error;
  }
}