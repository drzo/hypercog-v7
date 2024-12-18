export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface ApiRequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}