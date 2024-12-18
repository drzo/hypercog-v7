import { loggerService } from './logger.service';
import type { Note2Self } from '../types';

export class Note2SelfService {
  private notes: Note2Self[] = [];

  async addNote(note: Omit<Note2Self, 'id' | 'timestamp'>): Promise<Note2Self> {
    const newNote: Note2Self = {
      ...note,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };

    this.notes.push(newNote);
    loggerService.info('Added new Note2Self', { note: newNote });

    return newNote;
  }

  async getLatestNotes(limit = 10): Promise<Note2Self[]> {
    return this.notes
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

export const note2selfService = new Note2SelfService();