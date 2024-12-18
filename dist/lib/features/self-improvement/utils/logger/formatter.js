export class LogFormatter {
    formatEntry(level, component, message, data, error) {
        return {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            level,
            component,
            message,
            data,
            error: error ? {
                name: error.name,
                message: error.message,
                stack: error.stack
            } : undefined
        };
    }
}
export const logFormatter = new LogFormatter();
