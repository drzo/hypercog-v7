import { API_BASE_URL } from '../../constants';
import { handleError } from '../error';
export class ApiClient {
    baseURL;
    headers;
    timeout;
    constructor(options = {}) {
        this.baseURL = options.baseURL || API_BASE_URL;
        this.headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        this.timeout = options.timeout || 10000;
    }
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: this.headers,
                signal: AbortSignal.timeout(this.timeout)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }
        catch (error) {
            throw handleError(error);
        }
    }
}
export const apiClient = new ApiClient();
