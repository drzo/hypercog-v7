import type { Note2Self } from '../types/note';
import { persistenceService } from './persistence.service';
import { loggerService } from '$lib/features/core/services';

export class NoteService {
  async addNote(note: Omit<Note2Self, 'id' | 'timestamp'>): Promise<Note2Self> {
    try {
      const newNote: Note2Self = {
        ...note,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString()
      };

      await persistenceService.saveNote(newNote);
      loggerService.info('Added new Note2Self', { note: newNote });
      
      return newNote;
    } catch (error) {
      loggerService.error('Failed to add note', error);
      throw error;
    }
  }

  async getLatestNotes(limit = 10): Promise<Note2Self[]> {
    const notes = await persistenceService.getNotes();
    return notes
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, limit);
  }

  async getGoals(): Promise<Note2Self['goals']> {
    const latestNotes = await this.getLatestNotes();
    return latestNotes
      .flatMap(note => note.goals || [])
      .sort((a, b) => b.priority - a.priority);
  }
}

export const noteService = new NoteService();