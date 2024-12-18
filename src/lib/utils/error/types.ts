export interface ErrorMetadata {
  code?: string;
  context?: Record<string, any>;
}

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public metadata?: ErrorMetadata
  ) {
    super(message);
    this.name = 'AppError';
  }
}