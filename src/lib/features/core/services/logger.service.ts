export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  data?: unknown;
}

export interface LoggerService {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
  getLogs(): LogEntry[];
}

class LoggerServiceImpl implements LoggerService {
  private readonly logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  private createEntry(
    level: LogEntry['level'],
    message: string,
    data?: unknown
  ): LogEntry {
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

export const loggerService = new LoggerServiceImpl();