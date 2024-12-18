import { loggerService } from '../../../logger.service';
export class MetricsReporter {
    reportStateComparison(current, previous) {
        if (!previous) {
            this.reportCurrentState(current);
            return;
        }
        const memoryChange = this.calculateMemoryChange(current, previous);
        const performanceChange = this.calculatePerformanceChange(current, previous);
        loggerService.info('System metrics comparison', {
            memory: memoryChange,
            performance: performanceChange,
            timestamp: current.timestamp
        });
    }
    reportCurrentState(state) {
        loggerService.info('Current system metrics', {
            memory: {
                heapUsage: state.metrics.memoryUsage.heapUsed / state.metrics.memoryUsage.heapTotal,
                uptime: state.metrics.uptime
            },
            performance: {
                responseTime: state.metrics.responseTime,
                errorRate: state.metrics.errorRate,
                throughput: state.metrics.throughput
            },
            timestamp: state.timestamp
        });
    }
    calculateMemoryChange(current, previous) {
        const currentRatio = current.metrics.memoryUsage.heapUsed / current.metrics.memoryUsage.heapTotal;
        const previousRatio = previous.metrics.memoryUsage.heapUsed / previous.metrics.memoryUsage.heapTotal;
        return {
            heapUsageChange: ((currentRatio - previousRatio) / previousRatio) * 100,
            uptimeChange: current.metrics.uptime - previous.metrics.uptime
        };
    }
    calculatePerformanceChange(current, previous) {
        return {
            responseTimeChange: ((current.metrics.responseTime - previous.metrics.responseTime) / previous.metrics.responseTime) * 100,
            errorRateChange: current.metrics.errorRate - previous.metrics.errorRate,
            throughputChange: ((current.metrics.throughput - previous.metrics.throughput) / previous.metrics.throughput) * 100
        };
    }
}
export function createMetricsReporter() {
    return new MetricsReporter();
}
