import type { ApiOptions } from '../../types/api';
import { API_BASE_URL } from '../../constants';
import { handleError } from '../../utils/error';

export class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;
  private timeout: number;

  constructor(options: ApiOptions = {}) {
    this.baseURL = options.baseURL || API_BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    this.timeout = options.timeout || 10000;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request('GET', endpoint);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request('POST', endpoint, data);
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request('PUT', endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request('DELETE', endpoint);
  }

  private async request<T>(method: string, endpoint: string, data?: unknown): Promise<T> {
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
    } catch (error) {
      throw handleError(error);
    }
  }
}

export const apiClient = new ApiClient();