import type { SystemState, ImprovementAction } from '../../../../types';
import type { SystemMetricsAnalysis } from '../metrics/types';
import { evaluateMemoryRules } from './memory';
import { evaluatePerformanceRules } from './performance';
import { sortImprovements } from '../../utils';
import { loggerService } from '../../../logger.service';

export class RuleEngine {
  async evaluate(
    state: SystemState,
    analysis: SystemMetricsAnalysis
  ): Promise<ImprovementAction[]> {
    try {
      // Evaluate all rules in parallel
      const [memoryImprovements, performanceImprovements] = await Promise.all([
        evaluateMemoryRules(state, analysis.memory),
        evaluatePerformanceRules(state, analysis.performance)
      ]);

      // Combine and sort improvements
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

  private countByType(improvements: ImprovementAction[]): Record<string, number> {
    return improvements.reduce((acc, imp) => {
      acc[imp.type] = (acc[imp.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

export function createRuleEngine(): RuleEngine {
  return new RuleEngine();
}