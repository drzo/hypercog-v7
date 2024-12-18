import type { ApiOptions } from '../types';
import { API_BASE_URL } from '$lib/config/constants';
import { handleError } from '$lib/utils/error';

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
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: this.headers,
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

  // Add other methods (post, put, delete, etc.)
}

export const apiClient = new ApiClient();