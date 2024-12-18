import { logger } from '../logger';
import type { ErrorHandler, ErrorMetadata } from './types';

export class ErrorHandlerRegistry {
  private handlers: ErrorHandler[] = [];

  register(handler: ErrorHandler): void {
    this.handlers.push(handler);
  }

  unregister(handler: ErrorHandler): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  async handle(error: Error, metadata?: ErrorMetadata): Promise<void> {
    // Log the error first
    logger.error('Unhandled error', { error, metadata });

    // Run all handlers
    await Promise.all(
      this.handlers.map(handler => {
        try {
          return handler(error, metadata);
        } catch (handlerError) {
          logger.error('Error handler failed', { error: handlerError });
        }
      })
    );
  }
}

export const errorHandler = new ErrorHandlerRegistry();