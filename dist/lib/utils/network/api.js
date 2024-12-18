import { fetchWithRetry } from './fetch';
export class ApiClient {
    baseURL;
    constructor(options = {}) {
        this.baseURL = options.baseURL || '';
    }
    getFullURL(endpoint) {
        return `${this.baseURL}${endpoint}`;
    }
    async get(endpoint, options = {}) {
        try {
            const response = await fetchWithRetry(this.getFullURL(endpoint), {
                ...options,
                method: 'GET'
            });
            const data = await response.json();
            return { data };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async post(endpoint, body, options = {}) {
        try {
            const response = await fetchWithRetry(this.getFullURL(endpoint), {
                ...options,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return { data };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
export const api = new ApiClient();
