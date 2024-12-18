import { loggerService } from '../../../../logger.service';
import { IMPROVEMENT_THRESHOLDS } from '../../../constants';
export class MemoryStrategy {
    analyze(currentState, previousState) {
        try {
            const { heapUsed, heapTotal } = currentState.metrics.memoryUsage;
            const usageRatio = heapUsed / heapTotal;
            if (usageRatio > IMPROVEMENT_THRESHOLDS.MEMORY.MAX_HEAP_USAGE_INCREASE) {
                return [{
                        id: crypto.randomUUID(),
                        type: 'code',
                        description: 'Optimize memory usage',
                        priority: this.calculatePriority(usageRatio),
                        estimatedImpact: this.estimateImpact(usageRatio),
                        changes: [
                            {
                                path: 'src/lib/services/cache.service.ts',
                                before: null,
                                after: {
                                    maxSize: Math.floor(heapTotal * 0.1),
                                    cleanupInterval: 300000
                                }
                            }
                        ]
                    }];
            }
            return [];
        }
        catch (error) {
            loggerService.error('Memory strategy analysis failed', error);
            return [];
        }
    }
    calculatePriority(usageRatio) {
        return Math.min(Math.floor(usageRatio * 10), 10);
    }
    estimateImpact(usageRatio) {
        return Math.min(Math.floor((usageRatio - IMPROVEMENT_THRESHOLDS.MEMORY.MAX_HEAP_USAGE_INCREASE) * 20), 10);
    }
}
export function createMemoryStrategy() {
    return new MemoryStrategy();
}
