import type { SystemState, ImprovementAction } from '../../types';
import type { SystemAnalyzer } from './types';
import { analyzeMemoryUsage, analyzePerformance } from './metrics';
import { createMemoryOptimization, createPerformanceOptimization } from './optimizations';
import { sortImprovements } from './utils';
import { loggerService } from '../logger.service';

export class SystemAnalyzerImpl implements SystemAnalyzer {
  async analyze(currentState: SystemState, previousState: SystemState | null): Promise<ImprovementAction[]> {
    try {
      const improvements: ImprovementAction[] = [];

      // Analyze memory usage
      const memoryAnalysis = analyzeMemoryUsage(currentState);
      if (memoryAnalysis.shouldOptimize) {
        improvements.push(createMemoryOptimization(currentState));
      }

      // Analyze performance
      const performanceAnalysis = analyzePerformance(currentState, previousState);
      if (performanceAnalysis.shouldOptimize) {
        improvements.push(createPerformanceOptimization(currentState));
      }

      // Sort by priority and impact
      return sortImprovements(improvements);
    } catch (error) {
      loggerService.error('System analysis failed', error);
      throw error;
    }
  }
}

export function createSystemAnalyzer(): SystemAnalyzer {
  return new SystemAnalyzerImpl();
}