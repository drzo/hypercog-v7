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

export interface LogOptions {
  level?: LogEntry['level'];
  component?: string;
  since?: Date;
  limit?: number;
}