import type { LogEntry } from './logger';
import { logger } from './logger';

export class Analytics {
  async getErrorRate(timeWindow: number = 3600000): Promise<number> {
    const since = new Date(Date.now() - timeWindow);
    const logs = await logger.getLogs({ since });
    
    if (logs.length === 0) return 0;
    
    const errorCount = logs.filter(log => log.level === 'error').length;
    return errorCount / logs.length;
  }

  async getComponentStats(timeWindow: number = 3600000): Promise<Record<string, {
    total: number;
    errors: number;
    warnings: number;
  }>> {
    const since = new Date(Date.now() - timeWindow);
    const logs = await logger.getLogs({ since });
    
    const stats: Record<string, { total: number; errors: number; warnings: number }> = {};
    
    for (const log of logs) {
      if (!stats[log.component]) {
        stats[log.component] = { total: 0, errors: 0, warnings: 0 };
      }
      
      stats[log.component].total++;
      if (log.level === 'error') stats[log.component].errors++;
      if (log.level === 'warn') stats[log.component].warnings++;
    }
    
    return stats;
  }

  async getErrorPatterns(timeWindow: number = 3600000): Promise<Array<{
    pattern: string;
    count: number;
    examples: LogEntry[];
  }>> {
    const since = new Date(Date.now() - timeWindow);
    const logs = await logger.getLogs({ level: 'error', since });
    
    const patterns: Record<string, { count: number; examples: LogEntry[] }> = {};
    
    for (const log of logs) {
      if (!log.error) continue;
      
      const pattern = `${log.error.name}: ${log.error.message}`;
      if (!patterns[pattern]) {
        patterns[pattern] = { count: 0, examples: [] };
      }
      
      patterns[pattern].count++;
      if (patterns[pattern].examples.length < 3) {
        patterns[pattern].examples.push(log);
      }
    }
    
    return Object.entries(patterns)
      .map(([pattern, data]) => ({ pattern, ...data }))
      .sort((a, b) => b.count - a.count);
  }
}

export const analytics = new Analytics();