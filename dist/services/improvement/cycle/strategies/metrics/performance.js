import { loggerService } from '../../../../logger.service';
import { IMPROVEMENT_THRESHOLDS } from '../../../constants';
export class PerformanceStrategy {
    analyze(currentState, previousState) {
        try {
            const improvements = [];
            if (currentState.metrics.responseTime > IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_RESPONSE_TIME_INCREASE) {
                improvements.push(this.createResponseTimeImprovement(currentState));
            }
            if (currentState.metrics.errorRate > IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_ERROR_RATE_INCREASE) {
                improvements.push(this.createErrorRateImprovement());
            }
            if (previousState &&
                currentState.metrics.throughput < previousState.metrics.throughput * (1 - IMPROVEMENT_THRESHOLDS.PERFORMANCE.MAX_THROUGHPUT_DECREASE)) {
                improvements.push(this.createThroughputImprovement());
            }
            return improvements;
        }
        catch (error) {
            loggerService.error('Performance strategy analysis failed', error);
            return [];
        }
    }
    createResponseTimeImprovement(state) {
        return {
            id: crypto.randomUUID(),
            type: 'code',
            description: 'Optimize response time',
            priority: 8,
            estimatedImpact: 7,
            changes: [{
                    path: 'src/lib/services/request-handler.ts',
                    before: null,
                    after: {
                        cacheEnabled: true,
                        compressionEnabled: true
                    }
                }]
        };
    }
    createErrorRateImprovement() {
        return {
            id: crypto.randomUUID(),
            type: 'code',
            description: 'Reduce error rate',
            priority: 9,
            estimatedImpact: 8,
            changes: [{
                    path: 'src/lib/services/error-handler.ts',
                    before: null,
                    after: {
                        retryEnabled: true,
                        maxRetries: 3,
                        retryDelay: 1000
                    }
                }]
        };
    }
    createThroughputImprovement() {
        return {
            id: crypto.randomUUID(),
            type: 'code',
            description: 'Improve throughput',
            priority: 7,
            estimatedImpact: 7,
            changes: [{
                    path: 'src/lib/services/request-queue.ts',
                    before: null,
                    after: {
                        batchSize: 10,
                        concurrency: 3
                    }
                }]
        };
    }
}
export function createPerformanceStrategy() {
    return new PerformanceStrategy();
}