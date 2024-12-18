export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface ApiOptions {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
}