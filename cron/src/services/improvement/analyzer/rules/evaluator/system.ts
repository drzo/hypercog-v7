import type { SystemState } from '../../../../../types';
import type { SystemMetricsAnalysis } from '../../metrics/types';
import type { RuleContext } from '../types';
import { createMemoryRuleEvaluator } from './memory';
import { createPerformanceRuleEvaluator } from './performance';
import { loggerService } from '../../../../logger.service';

export class SystemRuleEvaluator {
  private readonly memoryEvaluator;
  private readonly performanceEvaluator;

  constructor() {
    this.memoryEvaluator = createMemoryRuleEvaluator();
    this.performanceEvaluator = createPerformanceRuleEvaluator();
  }

  async evaluate(
    state: SystemState,
    analysis: SystemMetricsAnalysis
  ): Promise<RuleContext[]> {
    try {
      // Evaluate rules in parallel for better performance
      const [memoryContexts, performanceContexts] = await Promise.all([
        this.memoryEvaluator.evaluate(state, analysis.memory),
        this.performanceEvaluator.evaluate(state, analysis.performance)
      ]);

      const contexts = [...memoryContexts, ...performanceContexts];

      loggerService.info('System rules evaluated', {
        totalContexts: contexts.length,
        byType: {
          memory: memoryContexts.length,
          performance: performanceContexts.length
        },
        metrics: {
          memory: analysis.memory,
          performance: analysis.performance
        },
        state: {
          timestamp: state.timestamp
        }
      });

      return contexts;
    } catch (error) {
      loggerService.error('Failed to evaluate system rules', error);
      throw error;
    }
  }
}

export function createSystemRuleEvaluator(): SystemRuleEvaluator {
  return new SystemRuleEvaluator();
}