import type { Env } from '../../../../types';
import type { ImprovementServices } from './context';
import { createGitHubService } from '../../../github';
import { createNoteService } from '../../../note';
import { createImprovementService } from '../../../improvement';

export function createImprovementServices(env: Env): ImprovementServices {
  return {
    githubService: createGitHubService(env),
    noteService: createNoteService(env),
    improvementService: createImprovementService(env)
  };
}