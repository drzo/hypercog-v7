export * from './types';
export { logger } from './logger';
export { formatLogEntry, formatLogEntryHTML } from './formatter';

// Re-export commonly used logger functions
export const {
  debug,
  info,
  warn,
  error,
  getLogs
} = logger;