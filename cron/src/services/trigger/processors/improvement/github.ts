import type { ImprovementAction } from '../../../../types';
import { loggerService } from '../../../logger.service';

export class GitHubProcessor {
  constructor(private readonly githubService: any) {}

  async process(improvement: ImprovementAction): Promise<void> {
    try {
      await this.githubService.createImprovementPR(improvement);
      loggerService.info('Created GitHub PR', { improvement });
    } catch (error) {
      loggerService.error('Failed to create GitHub PR', error);
      throw error;
    }
  }
}

export function createGitHubProcessor(githubService: any): GitHubProcessor {
  return new GitHubProcessor(githubService);
}