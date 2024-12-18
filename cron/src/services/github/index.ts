import { loggerService } from '../logger.service';
import type { ImprovementAction, Env } from '../../types';
import { createGitHubClient, parseRepoUrl } from './api';
import { generatePRDescription } from './pr';
import { createCommit } from './commits';

export class GitHubService {
  private readonly octokit;
  private readonly repoInfo;

  constructor(env: Env) {
    this.octokit = createGitHubClient(env);
    this.repoInfo = parseRepoUrl(env.GIT_HUB_REPO_URL);
  }

  async createImprovementPR(improvement: ImprovementAction): Promise<void> {
    const { owner, repo } = this.repoInfo;

    try {
      // Get default branch ref
      const { data: ref } = await this.octokit.git.getRef({
        owner,
        repo,
        ref: 'heads/main'
      });

      // Create new branch
      const branchName = `improvement/${improvement.id}`;
      await this.octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: ref.object.sha
      });

      // Create commits for changes
      for (const change of improvement.changes) {
        await createCommit(this.octokit, owner, repo, branchName, change);
      }

      // Create pull request
      await this.octokit.pulls.create({
        owner,
        repo,
        title: improvement.description,
        body: generatePRDescription(improvement),
        head: branchName,
        base: 'main'
      });

      loggerService.info('Created improvement PR', { improvement });
    } catch (error) {
      loggerService.error('Failed to create improvement PR', error);
      throw error;
    }
  }
}

export function createGitHubService(env: Env): GitHubService {
  return new GitHubService(env);
}