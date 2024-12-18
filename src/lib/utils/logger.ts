export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

class Logger {
  private readonly logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  private createEntry(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data
    };
  }

  private log(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
    
    if (import.meta.env.DEV) {
      console[entry.level](entry.message, entry.data || '');
    }
  }

  debug(message: string, data?: unknown): void {
    this.log(this.createEntry('debug', message, data));
  }

  info(message: string, data?: unknown): void {
    this.log(this.createEntry('info', message, data));
  }

  warn(message: string, data?: unknown): void {
    this.log(this.createEntry('warn', message, data));
  }

  error(message: string, data?: unknown): void {
    this.log(this.createEntry('error', message, data));
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }
}

export const logger = new Logger();