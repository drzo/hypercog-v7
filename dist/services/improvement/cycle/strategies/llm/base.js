import { loggerService } from '../../../../logger.service';
export class LLMStrategy {
    async analyze(currentState, previousState) {
        try {
            loggerService.info(`Analyzing system with ${this.name} LLM strategy`);
            return await this.getStrategicGuidance(currentState, previousState);
        }
        catch (error) {
            loggerService.error(`LLM strategy ${this.name} analysis failed`, error);
            return [];
        }
    }
    formatSystemState(state) {
        return JSON.stringify({
            metrics: state.metrics,
            config: state.config,
            timestamp: state.timestamp
        }, null, 2);
    }
    formatMetricsComparison(current, previous) {
        if (!previous)
            return 'No previous state available for comparison';
        const memoryChange = (current.metrics.memoryUsage.heapUsed / current.metrics.memoryUsage.heapTotal) -
            (previous.metrics.memoryUsage.heapUsed / previous.metrics.memoryUsage.heapTotal);
        const responseTimeChange = (current.metrics.responseTime - previous.metrics.responseTime) / previous.metrics.responseTime;
        const errorRateChange = current.metrics.errorRate - previous.metrics.errorRate;
        const throughputChange = (current.metrics.throughput - previous.metrics.throughput) / previous.metrics.throughput;
        return JSON.stringify({
            memory: { heapUsageChange: memoryChange * 100 },
            performance: {
                responseTimeChange: responseTimeChange * 100,
                errorRateChange: errorRateChange * 100,
                throughputChange: throughputChange * 100
            }
        }, null, 2);
    }
}