import type { Note2Self } from '../../types';

export interface NoteCreator {
  success(improvement: ImprovementAction): Promise<void>;
  failure(improvement: ImprovementAction, error: Error): Promise<void>;
  degradation(improvement: ImprovementAction, metrics: Record<string, number>): Promise<void>;
}

export interface NoteRepository {
  save(note: Note2Self): Promise<void>;
  getLatest(): Promise<Note2Self | null>;
  getAll(): Promise<Note2Self[]>;
}