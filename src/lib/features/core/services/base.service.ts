// Base service class with common functionality
export abstract class BaseService {
  protected handleError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }

  protected async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}