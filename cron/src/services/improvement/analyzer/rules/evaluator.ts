import type { SystemState, ImprovementAction } from '../../../../types';
import type { SystemMetricsAnalysis } from '../metrics/system';
import { evaluateMemoryRules } from './memory';
import { evaluatePerformanceRules } from './performance';
import { sortImprovements } from '../../utils';
import { loggerService } from '../../../logger.service';

export class RuleEvaluator {
  async evaluateAll(
    state: SystemState,
    analysis: SystemMetricsAnalysis
  ): Promise<ImprovementAction[]> {
    try {
      const [memoryImprovements, performanceImprovements] = await Promise.all([
        this.evaluateMemoryRules(state, analysis.memory),
        this.evaluatePerformanceRules(state, analysis.performance)
      ]);

      const improvements = sortImprovements([
        ...memoryImprovements,
        ...performanceImprovements
      ]);

      loggerService.info('Rules evaluated', {
        totalImprovements: improvements.length,
        byType: this.countByType(improvements)
      });

      return improvements;
    } catch (error) {
      loggerService.error('Rule evaluation failed', error);
      throw error;
    }
  }

  private async evaluateMemoryRules(state: SystemState, metrics: MemoryMetrics) {
    return evaluateMemoryRules(state, metrics);
  }

  private async evaluatePerformanceRules(state: SystemState, metrics: PerformanceMetrics) {
    return evaluatePerformanceRules(state, metrics);
  }

  private countByType(improvements: ImprovementAction[]): Record<string, number> {
    return improvements.reduce((acc, imp) => {
      acc[imp.type] = (acc[imp.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

export function createRuleEvaluator(): RuleEvaluator {
  return new RuleEvaluator();
}