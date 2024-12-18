import { noteService } from '../note/note.service';
import type { ImprovementAction } from '../../types';

export const createNote = {
  success: async (improvement: ImprovementAction) => {
    await noteService.addNote({
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
  },

  failure: async (improvement: ImprovementAction, error: Error) => {
    await noteService.addNote({
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
};