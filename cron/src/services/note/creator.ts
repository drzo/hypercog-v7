import type { NoteCreator } from './types';
import type { NoteRepository } from './types';
import type { ImprovementAction } from '../../types';

export class NoteCreatorService implements NoteCreator {
  constructor(private readonly repository: NoteRepository) {}

  async success(improvement: ImprovementAction): Promise<void> {
    await this.repository.save({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: 'improvement',
      description: improvement.description,
      changes: improvement.changes.map(c => ({
        component: c.path,
        before: c.before,
        after: c.after
      })),
      goals: [{
        type: 'improvement',
        description: `Implement ${improvement.description}`,
        priority: improvement.priority
      }]
    });
  }

  async failure(improvement: ImprovementAction, error: Error): Promise<void> {
    await this.repository.save({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: 'failure',
      description: `Failed to implement improvement: ${improvement.description}`,
      changes: improvement.changes.map(c => ({
        component: c.path,
        before: c.before,
        after: c.after
      })),
      goals: [{
        type: 'diagnostics',
        description: `Fix implementation of: ${improvement.description}`,
        priority: improvement.priority
      }]
    });
  }

  async degradation(improvement: ImprovementAction, metrics: Record<string, number>): Promise<void> {
    await this.repository.save({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: 'degradation',
      description: `System degradation after implementing: ${improvement.description}`,
      changes: improvement.changes.map(c => ({
        component: c.path,
        before: c.before,
        after: c.after
      })),
      metrics: {
        before: {},
        after: metrics
      },
      goals: [{
        type: 'rollback',
        description: `Rollback changes from: ${improvement.description}`,
        priority: improvement.priority + 1
      }]
    });
  }
}