import { loggerService } from '../../../logger.service';
import { createImprovementServices } from './factory';
import { createImprovementProcessor } from './processor';
import type { JobContext } from '../types';

export async function improvementJob(context: JobContext): Promise<void> {
  const { env, io } = context;

  try {
    // Initialize services and processor
    const services = createImprovementServices(env);
    const processor = createImprovementProcessor(services);

    // Get latest Note2Self
    const latestNote = await services.noteService.getLatestNote();
    
    // Evaluate system
    const result = await services.improvementService.evaluateSystem(latestNote);

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

    // Report final status
    await io.createStatus({
      label: 'Improvement Cycle',
      state: 'completed',
      data: {
        improvements: result.improvements.length,
        timestamp: result.timestamp
      }
    });
  } catch (error) {
    loggerService.error('Improvement job failed', error);
    throw error;
  }
}

export * from './types';
export * from './processor';
export * from './factory';