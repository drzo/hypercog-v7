export class ApiError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}
export async function fetchApi(endpoint, options = {}) {
    try {
        const response = await fetch(`/api${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!response.ok) {
            throw new ApiError(response.status, await response.text());
        }
        const data = await response.json();
        return { data };
    }
    catch (error) {
        if (error instanceof ApiError) {
            return { error: error.message };
        }
        return { error: 'An unexpected error occurred' };
    }
}
