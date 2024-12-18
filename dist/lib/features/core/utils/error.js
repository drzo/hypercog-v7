export class AppError extends Error {
    code;
    metadata;
    constructor(message, code, metadata) {
        super(message);
        this.code = code;
        this.metadata = metadata;
        this.name = 'AppError';
    }
}
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
