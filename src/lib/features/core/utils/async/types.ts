export interface AsyncOptions {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  signal?: AbortSignal;
  onRetry?: (error: Error, attempt: number) => Promise<void> | void;
  shouldRetry?: (error: Error, attempt: number) => boolean;
  onTimeout?: () => void;
  onAbort?: () => void;
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retryCount?: number;
  lastAttempt?: Date;
}

export interface QueueOptions {
  concurrency?: number;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
  priority?: number;
  signal?: AbortSignal;
}

export interface BatchOptions {
  maxBatchSize: number;
  maxWaitTime: number;
  concurrency?: number;
  timeout?: number;
  retryOptions?: AsyncOptions;
}

export interface TaskOptions {
  timeout?: number;
  signal?: AbortSignal;
  priority?: number;
  retries?: number;
}

export interface TaskResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
  retryCount?: number;
  duration?: number;
}