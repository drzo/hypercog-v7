export class AppError extends Error {
    metadata;
    constructor(message, metadata = {}) {
        super(message);
        this.name = 'AppError';
        this.metadata = {
            ...metadata,
            timestamp: new Date().toISOString()
        };
    }
    serialize() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            metadata: this.metadata
        };
    }
}
export class ValidationError extends AppError {
    constructor(message, metadata) {
        super(message, { ...metadata, code: 'VALIDATION_ERROR' });
        this.name = 'ValidationError';
    }
}
export class NetworkError extends AppError {
    constructor(message, metadata) {
        super(message, { ...metadata, code: 'NETWORK_ERROR' });
        this.name = 'NetworkError';
    }
}
export class AuthError extends AppError {
    constructor(message, metadata) {
        super(message, { ...metadata, code: 'AUTH_ERROR' });
        this.name = 'AuthError';
    }
}