import { loggerService } from '$lib/features/core/services';
import { storage } from './storage';
export class Logger {
    LOG_KEY = 'system_logs';
    MAX_LOGS = 1000;
    async log(level, component, message, data, error) {
        const entry = {
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
        // Store log entry
        await this.storeLog(entry);
        // Forward to core logger
        loggerService[level](message, { ...data, component, error });
    }
    async debug(component, message, data) {
        await this.log('debug', component, message, data);
    }
    async info(component, message, data) {
        await this.log('info', component, message, data);
    }
    async warn(component, message, data) {
        await this.log('warn', component, message, data);
    }
    async error(component, message, error, data) {
        await this.log('error', component, message, data, error);
    }
    async getLogs(options = {}) {
        const logs = await storage.load(this.LOG_KEY) || [];
        return logs
            .filter(log => {
            if (options.level && log.level !== options.level)
                return false;
            if (options.component && log.component !== options.component)
                return false;
            if (options.since && new Date(log.timestamp) < options.since)
                return false;
            return true;
        })
            .slice(-1 * (options.limit || logs.length));
    }
    async storeLog(entry) {
        const logs = await storage.load(this.LOG_KEY) || [];
        logs.push(entry);
        // Keep only last MAX_LOGS entries
        if (logs.length > this.MAX_LOGS) {
            logs.splice(0, logs.length - this.MAX_LOGS);
        }
        await storage.save(this.LOG_KEY, logs);
    }
}
export const logger = new Logger();
