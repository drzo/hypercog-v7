export interface ApiRequestConfig {
  method: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body?: unknown;
}

export interface ApiError {
  message: string;
  status: number;
}