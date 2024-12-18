import type { SystemState } from '../types/state';
import type { Note2Self } from '../types/note';
import { storage } from '../utils/storage';
import { loggerService } from '$lib/features/core/services';

export class PersistenceService {
  private readonly KEYS = {
    STATE_HISTORY: 'state_history',
    NOTES: 'notes'
  };

  async saveState(state: SystemState): Promise<void> {
    try {
      const history = await this.getStateHistory();
      history.push(state);
      
      // Keep only last 100 states
      if (history.length > 100) {
        history.shift();
      }

      await storage.save(this.KEYS.STATE_HISTORY, history);
      loggerService.info('Saved system state');
    } catch (error) {
      loggerService.error('Failed to save state', error);
      throw error;
    }
  }

  async getStateHistory(): Promise<SystemState[]> {
    return await storage.load<SystemState[]>(this.KEYS.STATE_HISTORY) || [];
  }

  async getLatestState(): Promise<SystemState | null> {
    const history = await this.getStateHistory();
    return history.length > 0 ? history[history.length - 1] : null;
  }

  async saveNote(note: Note2Self): Promise<void> {
    try {
      const notes = await this.getNotes();
      notes.push(note);
      await storage.save(this.KEYS.NOTES, notes);
      loggerService.info('Saved note', { noteId: note.id });
    } catch (error) {
      loggerService.error('Failed to save note', error);
      throw error;
    }
  }

  async getNotes(): Promise<Note2Self[]> {
    return await storage.load<Note2Self[]>(this.KEYS.NOTES) || [];
  }
}

export const persistenceService = new PersistenceService();