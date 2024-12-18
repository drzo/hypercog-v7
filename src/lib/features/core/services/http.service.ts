import { API_CONFIG } from '../constants/config';
import { BaseService } from './base.service';

export class HttpService extends BaseService {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    super();
    this.baseURL = API_CONFIG.baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        }
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE'
    });
  }
}

export const httpService = new HttpService();