import type { Env } from '../../../types';
import type { CycleServices } from './types';
import { createStateService } from '../../state/service';
import { createImprovementService } from '../service';
import { createNoteService } from '../../note/service';
import { createGitHubService } from '../../github';

export function createCycleServices(env: Env): CycleServices {
  return {
    stateService: createStateService(env),
    improvementService: createImprovementService(env),
    noteService: createNoteService(env),
    githubService: createGitHubService(env)
  };
}