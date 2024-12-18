import { fetchWithRetry, type FetchOptions } from './fetch';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface ApiOptions extends FetchOptions {
  baseURL?: string;
}

export class ApiClient {
  private baseURL: string;

  constructor(options: ApiOptions = {}) {
    this.baseURL = options.baseURL || '';
  }

  private getFullURL(endpoint: string): string {
    return `${this.baseURL}${endpoint}`;
  }

  async get<T>(endpoint: string, options: ApiOptions = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetchWithRetry(this.getFullURL(endpoint), {
        ...options,
        method: 'GET'
      });
      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  }

  async post<T>(endpoint: string, body: any, options: ApiOptions = {}): Promise<ApiResponse<T>> {
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
    } catch (error) {
      return { error: error.message };
    }
  }
}

export const api = new ApiClient();