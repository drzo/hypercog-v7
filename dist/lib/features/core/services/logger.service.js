class LoggerServiceImpl {
    logs = [];
    maxLogs = 1000;
    createEntry(level, message, data) {
        return {
            level,
            message,
            timestamp: new Date().toISOString(),
            data
        };
    }
    log(entry) {
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        if (import.meta.env.DEV) {
            console[entry.level](entry.message, entry.data || '');
        }
    }
    debug(message, data) {
        this.log(this.createEntry('debug', message, data));
    }
    info(message, data) {
        this.log(this.createEntry('info', message, data));
    }
    warn(message, data) {
        this.log(this.createEntry('warn', message, data));
    }
    error(message, data) {
        this.log(this.createEntry('error', message, data));
    }
    getLogs() {
        return [...this.logs];
    }
}
export const loggerService = new LoggerServiceImpl();
