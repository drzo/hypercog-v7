import { ImprovementStrategy } from './base';
import type { ImprovementAction, SystemState } from '../../../../types';
import { memoryAnalyzer } from '../../analysis/metrics/memory-analyzer';
import { performanceAnalyzer } from '../../analysis/metrics/performance-analyzer';

export class AlternativeStrategy extends ImprovementStrategy {
  name = 'alternative';

  protected async doAnalyze(
    currentState: SystemState,
    previousState: SystemState | null
  ): Promise<ImprovementAction[]> {
    // Focus on memory and performance optimizations first
    const [memoryImprovements, performanceImprovements] = await Promise.all([
      memoryAnalyzer.analyze(currentState, previousState),
      performanceAnalyzer.analyze(currentState, previousState)
    ]);

    return [...memoryImprovements, ...performanceImprovements];
  }
}