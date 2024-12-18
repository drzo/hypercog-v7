import { ImprovementStrategy } from './base';
import { memoryAnalyzer } from '../../analysis/metrics/memory-analyzer';
import { performanceAnalyzer } from '../../analysis/metrics/performance-analyzer';
export class AlternativeStrategy extends ImprovementStrategy {
    name = 'alternative';
    async doAnalyze(currentState, previousState) {
        // Focus on memory and performance optimizations first
        const [memoryImprovements, performanceImprovements] = await Promise.all([
            memoryAnalyzer.analyze(currentState, previousState),
            performanceAnalyzer.analyze(currentState, previousState)
        ]);
        return [...memoryImprovements, ...performanceImprovements];
    }
}
