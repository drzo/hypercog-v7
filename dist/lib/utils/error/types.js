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
