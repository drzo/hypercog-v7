export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface AsyncOptions {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
}