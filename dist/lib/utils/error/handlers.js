import { AppError } from './types';
export function isAppError(error) {
    return error instanceof AppError;
}
export function handleError(error) {
    if (isAppError(error)) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
}
