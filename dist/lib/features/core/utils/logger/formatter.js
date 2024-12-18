export class LogFormatter {
    formatEntry(level, component, message, data, error) {
        return {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            level,
            component,
            message,
            data,
            error: error ? this.formatError(error) : undefined
        };
    }
    formatError(error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack
        };
    }
    formatLogText(entry) {
        const timestamp = new Date(entry.timestamp).toLocaleString();
        const level = entry.level.toUpperCase().padEnd(5);
        let message = `[${timestamp}] ${level} ${entry.message}`;
        if (entry.data) {
            message += '\n' + JSON.stringify(entry.data, null, 2);
        }
        if (entry.error) {
            message += '\n' + entry.error.stack;
        }
        return message;
    }
}
export const logFormatter = new LogFormatter();
