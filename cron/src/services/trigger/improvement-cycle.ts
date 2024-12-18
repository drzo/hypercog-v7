import { loggerService } from '../logger.service';
import { improvementService } from '../improvement.service';
import { githubService } from '../github';
import { noteService } from '../note.service';
import { createNote } from './notes';
import type { ImprovementAction } from '../../types';

export async function improvementCycle(payload: any, io: any): Promise<void> {
  try {
    // 1. Get latest Note2Self
    const latestNote = await noteService.getLatestNote();
    
    // 2. Evaluate system and generate improvements based on latest note
    const result = await improvementService.evaluateSystem(latestNote);

    // 3. Process improvements
    await processImprovements(result.improvements);
  } catch (error) {
    loggerService.error('Improvement cycle failed', error);
    throw error;
  }
}

async function processImprovements(improvements: ImprovementAction[]): Promise<void> {
  for (const improvement of improvements) {
    try {
      // Create GitHub PR
      await githubService.createImprovementPR(improvement);
      
      // Document success
      await createNote.success(improvement);
      
      loggerService.info('Processed improvement successfully', { improvement });
    } catch (error) {
      // Document failure
      await createNote.failure(improvement, error);
      loggerService.error('Failed to process improvement', { improvement, error });
    }
  }
}