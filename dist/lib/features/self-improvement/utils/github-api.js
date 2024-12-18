import { loggerService } from '$lib/features/core/services';
export class GitHubApiUtil {
    apiKey;
    baseUrl = 'https://api.github.com';
    headers;
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.headers = {
            'Authorization': `token ${apiKey}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };
    }
    async request(path, options = {}) {
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
        }
        catch (error) {
            loggerService.error('GitHub API request failed', { path, error });
            throw error;
        }
    }
}
