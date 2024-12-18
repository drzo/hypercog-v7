import { logger } from '../logger';
export class ErrorAnalyzer {
    async getErrorRate(timeWindow = 3600000) {
        const since = new Date(Date.now() - timeWindow);
        const logs = await logger.getLogs({ since });
        if (logs.length === 0)
            return 0;
        const errorCount = logs.filter(log => log.level === 'error').length;
        return errorCount / logs.length;
    }
    async getErrorPatterns(timeWindow = 3600000) {
        const since = new Date(Date.now() - timeWindow);
        const logs = await logger.getLogs({ level: 'error', since });
        const patterns = {};
        for (const log of logs) {
            if (!log.error)
                continue;
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
export const errorAnalyzer = new ErrorAnalyzer();
