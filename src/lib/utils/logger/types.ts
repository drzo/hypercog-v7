export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  error?: Error;
}

export interface LoggerOptions {
  minLevel?: LogLevel;
  maxEntries?: number;
  persist?: boolean;
}

export interface LogFilter {
  level?: LogLevel;
  startDate?: Date;
  endDate?: Date;
  search?: string;
}