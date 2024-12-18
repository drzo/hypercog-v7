export interface ErrorMetadata {
  code?: string;
  context?: Record<string, any>;
  timestamp?: string;
  source?: string;
}

export type ErrorHandler = (error: Error, metadata?: ErrorMetadata) => Promise<void>;

export interface ErrorHandlerOptions {
  onError?: (error: Error) => void;
  retries?: number;
  retryDelay?: number;
}