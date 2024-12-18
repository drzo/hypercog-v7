import type { ErrorHandler, ErrorHandlerOptions } from './types';
import { logger } from '../../services/logger.service';

export class ErrorHandlerRegistry {
  private handlers: ErrorHandler[] = [];
  private options: ErrorHandlerOptions;

  constructor(options: ErrorHandlerOptions = {}) {
    this.options = options;
  }

  register(handler: ErrorHandler): void {
    this.handlers.push(handler);
  }

  unregister(handler: ErrorHandler): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  async handle(error: Error): Promise<void> {
    // Log the error first
    logger.error('Unhandled error', { error });

    // Run all handlers
    await Promise.all(
      this.handlers.map(handler => {
        try {
          return handler(error);
        } catch (handlerError) {
          logger.error('Error handler failed', { error: handlerError });
          if (this.options.onError) {
            this.options.onError(handlerError);
          }
        }
      })
    );
  }
}

export const errorHandler = new ErrorHandlerRegistry();