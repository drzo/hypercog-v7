export function withTimeout(promise, options = {}) {
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
