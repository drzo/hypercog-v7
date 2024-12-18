// Base service class with common functionality
export class BaseService {
    handleError(error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unexpected error occurred');
    }
    async handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}
