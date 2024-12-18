import { Octokit } from '@octokit/rest';
import type { Env } from '../../types';

export function createGitHubClient(env: Env): Octokit {
  if (!env.GIT_HUB_API_KEY) {
    throw new Error('GitHub API key not configured');
  }

  return new Octokit({ auth: env.GIT_HUB_API_KEY });
}

export function parseRepoUrl(url: string): { owner: string; repo: string } {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    throw new Error('Invalid GitHub repo URL');
  }

  const [, owner, repo] = match;
  return { owner, repo };
}