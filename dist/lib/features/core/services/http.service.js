import { API_CONFIG } from '../constants/config';
import { BaseService } from './base.service';
export class HttpService extends BaseService {
    baseURL;
    defaultHeaders;
    constructor() {
        super();
        this.baseURL = API_CONFIG.baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers: {
                    ...this.defaultHeaders,
                    ...options.headers
                }
            });
            return this.handleResponse(response);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async get(endpoint) {
        return this.request(endpoint);
    }
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
}
export const httpService = new HttpService();
