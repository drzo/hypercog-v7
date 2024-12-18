import type { LogEntry } from './types';

export class LogFormatter {
  formatEntry(
    level: LogEntry['level'],
    component: string,
    message: string,
    data?: any,
    error?: Error
  ): LogEntry {
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