import type { AsyncOptions } from './types';

export class TimeoutError extends Error {
  constructor(timeout: number) {
    super(`Operation timed out after ${timeout}ms`);
    this.name = 'TimeoutError';
  }
}

export function withTimeout<T>(
  promise: Promise<T>,
  options: AsyncOptions = {}
): Promise<T> {
  const { timeout = 5000, signal } = options;

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new TimeoutError(timeout));
    }, timeout);

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new Error('Operation aborted'));
      });
    }

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timeoutId));
  });
}