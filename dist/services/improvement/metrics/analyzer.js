import { IMPROVEMENT_THRESHOLDS } from '../constants';
export class MetricsAnalyzer {
    analyzeMemoryUsage(state) {
        const { heapUsed, heapTotal } = state.metrics.memoryUsage;
        const usageRatio = heapUsed / heapTotal;
        return {
            shouldOptimize: usageRatio > IMPROVEMENT_THRESHOLDS.MEMORY.MAX_HEAP_USAGE_INCREASE,
            usageRatio
        };
    }
    analyzePerformance(current, previous) {
        if (!previous) {
            return {
                shouldOptimize: false,
                metrics: {
                    responseTime: 0,
                    errorRate: 0,
                    throughput: 0
                }
            };
        }
        const metrics = {
            responseTime: (current.metrics.responseTime - previous.metrics.responseTime) / previous.metrics.responseTime,
            errorRate: current.metrics.errorRate - previous.metrics.errorRate,
            throughput: (current.metrics.throughput - previous.metrics.throughput) / previous.metrics.throughput
        };
        const shouldOptimize = metrics.responseTime > IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_RESPONSE_TIME_INCREASE ||
            metrics.errorRate > IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_ERROR_RATE_INCREASE ||
            metrics.throughput < -IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_THROUGHPUT_DECREASE;
        return { shouldOptimize, metrics };
    }
}
export function createMetricsAnalyzer() {
    return new MetricsAnalyzer();
}
