import { storageCache } from '../cache/storage';
const LOG_STORAGE_KEY = 'app_logs';
export class Logger {
    options;
    logs = [];
    constructor(options = {}) {
        this.options = {
            minLevel: options.minLevel || 'debug',
            maxEntries: options.maxEntries || 1000,
            persist: options.persist || false
        };
        if (this.options.persist) {
            this.loadLogs();
        }
    }
    log(level, message, data) {
        const entry = {
            level,
            message,
            timestamp: new Date().toISOString(),
            data
        };
        this.logs.unshift(entry);
        // Trim logs if exceeding max entries
        if (this.logs.length > this.options.maxEntries) {
            this.logs = this.logs.slice(0, this.options.maxEntries);
        }
        // Persist logs if enabled
        if (this.options.persist) {
            this.saveLogs();
        }
        // Console output in development
        if (import.meta.env.DEV) {
            console[level](message, data);
        }
    }
    debug(message, data) {
        if (this.shouldLog('debug')) {
            this.log('debug', message, data);
        }
    }
    info(message, data) {
        if (this.shouldLog('info')) {
            this.log('info', message, data);
        }
    }
    warn(message, data) {
        if (this.shouldLog('warn')) {
            this.log('warn', message, data);
        }
    }
    error(message, error, data) {
        if (this.shouldLog('error')) {
            this.log('error', message, { ...data, error });
        }
    }
    getLogs(filter) {
        return this.logs.filter(entry => {
            if (filter?.level && entry.level !== filter.level)
                return false;
            if (filter?.startDate && new Date(entry.timestamp) < filter.startDate)
                return false;
            if (filter?.endDate && new Date(entry.timestamp) > filter.endDate)
                return false;
            if (filter?.search && !entry.message.includes(filter.search))
                return false;
            return true;
        });
    }
    clear() {
        this.logs = [];
        if (this.options.persist) {
            storageCache.delete(LOG_STORAGE_KEY);
        }
    }
    shouldLog(level) {
        const levels = ['debug', 'info', 'warn', 'error'];
        const minLevelIndex = levels.indexOf(this.options.minLevel);
        const currentLevelIndex = levels.indexOf(level);
        return currentLevelIndex >= minLevelIndex;
    }
    loadLogs() {
        const savedLogs = storageCache.get(LOG_STORAGE_KEY);
        if (savedLogs) {
            this.logs = savedLogs;
        }
    }
    saveLogs() {
        storageCache.set(LOG_STORAGE_KEY, this.logs);
    }
}
export const logger = new Logger({ persist: true });
