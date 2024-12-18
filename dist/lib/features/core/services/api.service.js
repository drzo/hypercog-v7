import { API_CONFIG } from '$lib/config/constants';
class ApiServiceImpl {
    baseURL;
    defaultHeaders;
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }
    async request(endpoint, config = {}) {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), config.timeout || API_CONFIG.TIMEOUT);
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...config,
                headers: {
                    ...this.defaultHeaders,
                    ...config.headers
                },
                signal: controller.signal
            });
            clearTimeout(timeout);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return { data };
        }
        catch (error) {
            return {
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            };
        }
    }
    async get(endpoint, config) {
        return this.request(endpoint, { ...config, method: 'GET' });
    }
    async post(endpoint, data, config) {
        return this.request(endpoint, {
            ...config,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    async put(endpoint, data, config) {
        return this.request(endpoint, {
            ...config,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    async delete(endpoint, config) {
        return this.request(endpoint, { ...config, method: 'DELETE' });
    }
}
export const apiService = new ApiServiceImpl();
