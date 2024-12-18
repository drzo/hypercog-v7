import type { AsyncOptions } from './types';

export function withTimeout<T>(
  promise: Promise<T>,
  options: AsyncOptions = {}
): Promise<T> {
  const { timeout = 5000 } = options;

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeout}ms`));
    }, timeout);

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timeoutId));
  });
}