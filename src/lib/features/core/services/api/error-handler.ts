import type { ApiError } from '../../types/api';
import { loggerService } from '../logger.service';

export function handleApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    loggerService.error('API Error', error);
    return {
      message: error.message,
      status: error instanceof ApiError ? error.status : 500
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    status: 500
  };
}