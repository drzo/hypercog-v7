import { AppError } from './types';

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function handleError(error: unknown): string {
  if (isAppError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}