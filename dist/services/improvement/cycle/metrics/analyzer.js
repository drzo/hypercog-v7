import { IMPROVEMENT_THRESHOLDS } from '../../constants';
export class MetricsAnalyzer {
    analyzeMemoryUsage(state) {
        const { heapUsed, heapTotal } = state.metrics.memoryUsage;
        const heapUsageRatio = heapUsed / heapTotal;
        const heapFragmentation = (heapTotal - heapUsed) / heapTotal;
        return {
            shouldOptimize: heapUsageRatio > IMPROVEMENT_THRESHOLDS.MEMORY.MAX_HEAP_USAGE_INCREASE,
            metrics: {
                heapUsageRatio,
                heapFragmentation
            }
        };
    }
    analyzePerformance(current, previous) {
        if (!previous) {
            return {
                shouldOptimize: false,
                metrics: {
                    responseTimeChange: 0,
                    errorRateChange: 0,
                    throughputChange: 0
                }
            };
        }
        const metrics = {
            responseTimeChange: (current.metrics.responseTime - previous.metrics.responseTime) / previous.metrics.responseTime,
            errorRateChange: current.metrics.errorRate - previous.metrics.errorRate,
            throughputChange: (current.metrics.throughput - previous.metrics.throughput) / previous.metrics.throughput
        };
        const shouldOptimize = metrics.responseTimeChange > IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_RESPONSE_TIME_INCREASE ||
            metrics.errorRateChange > IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_ERROR_RATE_INCREASE ||
            metrics.throughputChange < -IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_THROUGHPUT_DECREASE;
        return { shouldOptimize, metrics };
    }
}
export function createMetricsAnalyzer() {
    return new MetricsAnalyzer();
}
