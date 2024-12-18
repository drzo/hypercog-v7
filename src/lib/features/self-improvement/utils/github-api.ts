import { loggerService } from '$lib/features/core/services';

interface GitHubApiOptions {
  method?: string;
  body?: any;
}

export class GitHubApiUtil {
  private readonly baseUrl = 'https://api.github.com';
  private readonly headers: HeadersInit;

  constructor(private readonly apiKey: string) {
    this.headers = {
      'Authorization': `token ${apiKey}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };
  }

  async request<T>(path: string, options: GitHubApiOptions = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: options.method || 'GET',
        headers: this.headers,
        body: options.body ? JSON.stringify(options.body) : undefined
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      loggerService.error('GitHub API request failed', { path, error });
      throw error;
    }
  }
}