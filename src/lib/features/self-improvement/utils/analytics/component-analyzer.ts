import { logger } from '../logger';

export class ComponentAnalyzer {
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
}

export const componentAnalyzer = new ComponentAnalyzer();