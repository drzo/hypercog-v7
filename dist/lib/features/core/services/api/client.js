import { API_BASE_URL } from '../../constants';
import { handleError } from '../../utils/error';
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
        return this.request('GET', endpoint);
    }
    async post(endpoint, data) {
        return this.request('POST', endpoint, data);
    }
    async put(endpoint, data) {
        return this.request('PUT', endpoint, data);
    }
    async delete(endpoint) {
        return this.request('DELETE', endpoint);
    }
    async request(method, endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method,
                headers: this.headers,
                body: data ? JSON.stringify(data) : undefined,
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
