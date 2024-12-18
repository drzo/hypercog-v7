import type { Note2Self } from '../../types';
import type { NoteRepository } from './types';
import { loggerService } from '../logger.service';

export class KVNoteRepository implements NoteRepository {
  constructor(private readonly kv: KVNamespace) {}

  async save(note: Note2Self): Promise<void> {
    try {
      await this.kv.put(`note:${note.id}`, JSON.stringify(note));
      loggerService.info('Saved note', { noteId: note.id });
    } catch (error) {
      loggerService.error('Failed to save note', error);
      throw error;
    }
  }

  async getLatest(): Promise<Note2Self | null> {
    try {
      const { keys } = await this.kv.list({ prefix: 'note:' });
      if (keys.length === 0) return null;

      const notes = await Promise.all(
        keys.map(async key => {
          const data = await this.kv.get(key.name);
          return data ? JSON.parse(data) as Note2Self : null;
        })
      );

      return notes
        .filter(Boolean)
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0] || null;
    } catch (error) {
      loggerService.error('Failed to get latest note', error);
      throw error;
    }
  }

  async getAll(): Promise<Note2Self[]> {
    try {
      const { keys } = await this.kv.list({ prefix: 'note:' });
      const notes = await Promise.all(
        keys.map(async key => {
          const data = await this.kv.get(key.name);
          return data ? JSON.parse(data) as Note2Self : null;
        })
      );
      return notes.filter(Boolean);
    } catch (error) {
      loggerService.error('Failed to get all notes', error);
      throw error;
    }
  }
}