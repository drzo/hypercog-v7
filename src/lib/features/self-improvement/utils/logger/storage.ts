import type { LogEntry } from './types';
import { storage } from '../storage';

export class LogStorage {
  private readonly LOG_KEY = 'system_logs';
  private readonly MAX_LOGS = 1000;

  async store(entry: LogEntry): Promise<void> {
    const logs = await this.load() || [];
    logs.push(entry);

    if (logs.length > this.MAX_LOGS) {
      logs.splice(0, logs.length - this.MAX_LOGS);
    }

    await storage.save(this.LOG_KEY, logs);
  }

  async load(): Promise<LogEntry[]> {
    return await storage.load<LogEntry[]>(this.LOG_KEY) || [];
  }
}

export const logStorage = new LogStorage();