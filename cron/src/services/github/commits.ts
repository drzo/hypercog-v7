import type { Octokit } from '@octokit/rest';
import type { ImprovementAction } from '../../types';

export async function createCommit(
  octokit: Octokit,
  owner: string,
  repo: string,
  branch: string,
  change: ImprovementAction['changes'][0]
): Promise<void> {
  // Get current file content if it exists
  let currentContent;
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: change.path,
      ref: branch
    });
    currentContent = data;
  } catch {
    // File doesn't exist yet
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: change.path,
    message: `Update ${change.path}`,
    content: Buffer.from(JSON.stringify(change.after)).toString('base64'),
    sha: currentContent?.sha,
    branch
  });
}