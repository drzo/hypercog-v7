import { loggerService } from '$lib/features/core/services';
import { logStorage } from './storage';
import { logFormatter } from './formatter';
export class Logger {
    async log(level, component, message, data, error) {
        const entry = logFormatter.formatEntry(level, component, message, data, error);
        await logStorage.store(entry);
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
        const logs = await logStorage.load();
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
}
export const logger = new Logger();
export * from './types';
