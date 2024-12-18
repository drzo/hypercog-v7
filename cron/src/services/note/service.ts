import type { Note2Self } from '../../types';
import type { NoteRepository } from './types';
import { KVNoteRepository } from './repository';
import { NoteCreatorService } from './creator';
import type { Env } from '../../types';

export class NoteService {
  private readonly repository: NoteRepository;
  private readonly creator: NoteCreatorService;

  constructor(env: Env) {
    this.repository = new KVNoteRepository(env.HYPERCOG_KV);
    this.creator = new NoteCreatorService(this.repository);
  }

  async addNote(note: Omit<Note2Self, 'id' | 'timestamp'>): Promise<Note2Self> {
    const newNote: Note2Self = {
      ...note,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };

    await this.repository.save(newNote);
    return newNote;
  }

  async getLatestNote(): Promise<Note2Self | null> {
    return this.repository.getLatest();
  }

  get create() {
    return this.creator;
  }
}

export function createNoteService(env: Env): NoteService {
  return new NoteService(env);
}