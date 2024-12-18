import { loggerService } from '../../../logger.service';
export class CycleAnalyzer {
    async analyzeCycleResults(monitor) {
        const results = monitor.getResults();
        // Group results by strategy
        const defaultResults = results.filter(r => r.cycleId.startsWith('default-'));
        const alternativeResults = results.filter(r => r.cycleId.startsWith('alternative-'));
        // Calculate success rates
        const defaultSuccess = this.calculateSuccessRate(defaultResults);
        const alternativeSuccess = this.calculateSuccessRate(alternativeResults);
        // Calculate average metrics
        const defaultMetrics = this.calculateAverageMetrics(defaultResults);
        const alternativeMetrics = this.calculateAverageMetrics(alternativeResults);
        const analysis = {
            defaultStrategy: {
                successRate: defaultSuccess,
                averageMetrics: defaultMetrics
            },
            alternativeStrategy: {
                successRate: alternativeSuccess,
                averageMetrics: alternativeMetrics
            },
            recommendation: this.generateRecommendation(defaultSuccess, alternativeSuccess, defaultMetrics, alternativeMetrics)
        };
        loggerService.info('Cycle analysis completed', { analysis });
        return analysis;
    }
    calculateSuccessRate(results) {
        if (results.length === 0)
            return 0;
        const successful = results.filter(r => r.success).length;
        return successful / results.length;
    }
    calculateAverageMetrics(results) {
        const metrics = results
            .filter(r => r.metrics)
            .map(r => r.metrics);
        if (metrics.length === 0)
            return {};
        return Object.keys(metrics[0]).reduce((acc, key) => {
            acc[key] = metrics.reduce((sum, m) => sum + m[key], 0) / metrics.length;
            return acc;
        }, {});
    }
    generateRecommendation(defaultSuccess, alternativeSuccess, defaultMetrics, alternativeMetrics) {
        // Compare success rates
        const successDiff = alternativeSuccess - defaultSuccess;
        // Compare key metrics
        const memoryDiff = (alternativeMetrics.memoryUsage || 0) - (defaultMetrics.memoryUsage || 0);
        const responseDiff = (alternativeMetrics.responseTime || 0) - (defaultMetrics.responseTime || 0);
        if (successDiff > 0.1) {
            return 'Alternative strategy shows significantly better success rate';
        }
        else if (successDiff < -0.1) {
            return 'Default strategy shows significantly better success rate';
        }
        else if (memoryDiff < -0.1) {
            return 'Alternative strategy shows better memory optimization';
        }
        else if (responseDiff < -0.1) {
            return 'Alternative strategy shows better response times';
        }
        return 'Both strategies show similar performance';
    }
}
export function createCycleAnalyzer() {
    return new CycleAnalyzer();
}
