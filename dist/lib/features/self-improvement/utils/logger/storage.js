import { storage } from '../storage';
export class LogStorage {
    LOG_KEY = 'system_logs';
    MAX_LOGS = 1000;
    async store(entry) {
        const logs = await this.load() || [];
        logs.push(entry);
        if (logs.length > this.MAX_LOGS) {
            logs.splice(0, logs.length - this.MAX_LOGS);
        }
        await storage.save(this.LOG_KEY, logs);
    }
    async load() {
        return await storage.load(this.LOG_KEY) || [];
    }
}
export const logStorage = new LogStorage();
