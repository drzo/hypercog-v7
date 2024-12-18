export class NetworkError extends Error {
    status;
    statusText;
    constructor(message, status, statusText) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.name = 'NetworkError';
    }
}
export async function fetchWithTimeout(url, options = {}) {
    const { timeout = 5000, ...fetchOptions } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal
        });
        if (!response.ok) {
            throw new NetworkError('Network response was not ok', response.status, response.statusText);
        }
        return response;
    }
    catch (error) {
        if (error.name === 'AbortError') {
            throw new NetworkError(`Request timeout after ${timeout}ms`);
        }
        throw error;
    }
    finally {
        clearTimeout(timeoutId);
    }
}
export async function fetchWithRetry(url, options = {}) {
    const { retries = 3, retryDelay = 1000, ...fetchOptions } = options;
    let lastError;
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await fetchWithTimeout(url, fetchOptions);
        }
        catch (error) {
            lastError = error;
            if (attempt < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
    }
    throw lastError;
}
