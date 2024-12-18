import { logger } from '../../services/logger.service';
export async function retry(fn, options = {}) {
    const { retries = 3, retryDelay = 1000, onRetry, shouldRetry = () => true } = options;
    let lastError;
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            attempt++;
            if (attempt === retries || !shouldRetry(error, attempt)) {
                break;
            }
            logger.warn('Retry attempt failed', {
                attempt,
                maxRetries: retries,
                error
            });
            if (onRetry) {
                await onRetry(error, attempt);
            }
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
    throw lastError;
}
