import type { SystemState } from '../types/state';
import type { ImprovementAction } from '../types/improvement';
import { memoryAnalyzer } from './metrics/memory-analyzer';
import { performanceAnalyzer } from './metrics/performance-analyzer';
import { dependencyAnalyzer } from './dependencies/dependency-analyzer';
import { configAnalyzer } from './config/config-analyzer';
import { loggerService } from '$lib/features/core/services';

export class SystemAnalyzer {
  async analyze(currentState: SystemState, previousState: SystemState | null): Promise<ImprovementAction[]> {
    try {
      const [
        memoryImprovements,
        performanceImprovements,
        dependencyImprovements,
        configImprovements
      ] = await Promise.all([
        memoryAnalyzer.analyze(currentState, previousState),
        performanceAnalyzer.analyze(currentState, previousState),
        dependencyAnalyzer.analyze(currentState),
        configAnalyzer.analyze(currentState, previousState)
      ]);

      const improvements = [
        ...memoryImprovements,
        ...performanceImprovements,
        ...dependencyImprovements,
        ...configImprovements
      ];

      // Sort improvements by priority and estimated impact
      improvements.sort((a, b) => {
        const scoreA = a.priority * 0.6 + a.estimatedImpact * 0.4;
        const scoreB = b.priority * 0.6 + b.estimatedImpact * 0.4;
        return scoreB - scoreA;
      });

      loggerService.info('System analysis completed', { 
        improvementCount: improvements.length 
      });

      return improvements;
    } catch (error) {
      loggerService.error('System analysis failed', error);
      throw error;
    }
  }
}

export const systemAnalyzer = new SystemAnalyzer();