import type { ImprovementAction } from '../../../../types';
import { loggerService } from '../../../logger.service';

export class NoteProcessor {
  constructor(private readonly noteService: any) {}

  async success(improvement: ImprovementAction): Promise<void> {
    try {
      await this.noteService.create.success(improvement);
      loggerService.info('Created success note', { improvement });
    } catch (error) {
      loggerService.error('Failed to create success note', error);
      throw error;
    }
  }

  async failure(improvement: ImprovementAction, error: Error): Promise<void> {
    try {
      await this.noteService.create.failure(improvement, error);
      loggerService.info('Created failure note', { improvement, error });
    } catch (noteError) {
      loggerService.error('Failed to create failure note', noteError);
      throw noteError;
    }
  }
}

export function createNoteProcessor(noteService: any): NoteProcessor {
  return new NoteProcessor(noteService);
}