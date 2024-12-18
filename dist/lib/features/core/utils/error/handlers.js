import { logger } from '../logger';
export class ErrorHandlerRegistry {
    handlers = [];
    register(handler) {
        this.handlers.push(handler);
    }
    unregister(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    async handle(error, metadata) {
        // Log the error first
        logger.error('Unhandled error', { error, metadata });
        // Run all handlers
        await Promise.all(this.handlers.map(handler => {
            try {
                return handler(error, metadata);
            }
            catch (handlerError) {
                logger.error('Error handler failed', { error: handlerError });
            }
        }));
    }
}
export const errorHandler = new ErrorHandlerRegistry();
