import { API_CONFIG } from '$lib/config/constants';
import type { ApiResponse, ApiRequestConfig } from './types';

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
  }

  private async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(),
        config.timeout || API_CONFIG.TIMEOUT
      );

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
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }

  async get<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown, config?: Omit<ApiRequestConfig, 'method'>) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put<T>(endpoint: string, data: unknown, config?: Omit<ApiRequestConfig, 'method'>) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const api = new ApiClient();