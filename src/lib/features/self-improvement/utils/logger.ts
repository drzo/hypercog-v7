import { loggerService } from '$lib/features/core/services';
import { storage } from './storage';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  component: string;
  message: string;
  data?: any;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

export class Logger {
  private readonly LOG_KEY = 'system_logs';
  private readonly MAX_LOGS = 1000;

  async log(
    level: LogEntry['level'],
    component: string,
    message: string,
    data?: any,
    error?: Error
  ): Promise<void> {
    const entry: LogEntry = {
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

  async debug(component: string, message: string, data?: any): Promise<void> {
    await this.log('debug', component, message, data);
  }

  async info(component: string, message: string, data?: any): Promise<void> {
    await this.log('info', component, message, data);
  }

  async warn(component: string, message: string, data?: any): Promise<void> {
    await this.log('warn', component, message, data);
  }

  async error(component: string, message: string, error?: Error, data?: any): Promise<void> {
    await this.log('error', component, message, data, error);
  }

  async getLogs(
    options: {
      level?: LogEntry['level'];
      component?: string;
      since?: Date;
      limit?: number;
    } = {}
  ): Promise<LogEntry[]> {
    const logs = await storage.load<LogEntry[]>(this.LOG_KEY) || [];
    
    return logs
      .filter(log => {
        if (options.level && log.level !== options.level) return false;
        if (options.component && log.component !== options.component) return false;
        if (options.since && new Date(log.timestamp) < options.since) return false;
        return true;
      })
      .slice(-1 * (options.limit || logs.length));
  }

  private async storeLog(entry: LogEntry): Promise<void> {
    const logs = await storage.load<LogEntry[]>(this.LOG_KEY) || [];
    logs.push(entry);

    // Keep only last MAX_LOGS entries
    if (logs.length > this.MAX_LOGS) {
      logs.splice(0, logs.length - this.MAX_LOGS);
    }

    await storage.save(this.LOG_KEY, logs);
  }
}

export const logger = new Logger();