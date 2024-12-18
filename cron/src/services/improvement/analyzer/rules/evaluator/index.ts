import type { SystemState } from '../../../../../types';
import type { SystemMetricsAnalysis } from '../../metrics/types';
import type { RuleContext } from '../types';
import { createMemoryRuleEvaluator } from './memory';
import { createPerformanceRuleEvaluator } from './performance';
import { loggerService } from '../../../../logger.service';

export class RuleEvaluator {
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
      const contexts = [
        ...this.memoryEvaluator.evaluate(state, analysis.memory),
        ...this.performanceEvaluator.evaluate(state, analysis.performance)
      ];

      loggerService.info('Rules evaluated', {
        totalContexts: contexts.length,
        byReason: this.countByReason(contexts)
      });

      return contexts;
    } catch (error) {
      loggerService.error('Rule evaluation failed', error);
      throw error;
    }
  }

  private countByReason(contexts: RuleContext[]): Record<string, number> {
    return contexts.reduce((acc, ctx) => {
      acc[ctx.reason] = (acc[ctx.reason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

export function createRuleEvaluator(): RuleEvaluator {
  return new RuleEvaluator();
}