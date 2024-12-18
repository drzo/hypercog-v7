import type { AsyncOptions } from './types';
import { logger } from '../../logger';

export async function retry<T>(
  fn: () => Promise<T>,
  options: AsyncOptions = {}
): Promise<T> {
  const { retries = 3, retryDelay = 1000 } = options;
  let lastError: Error;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      logger.warn('Retry attempt failed', {
        attempt: attempt + 1,
        maxRetries: retries,
        error
      });

      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  throw lastError;
}