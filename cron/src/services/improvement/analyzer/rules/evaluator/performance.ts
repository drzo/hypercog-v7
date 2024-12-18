import { BaseRuleEvaluator } from './base';
import type { SystemState } from '../../../../../types';
import type { PerformanceMetrics } from '../../metrics/types';
import type { RuleContext } from '../types';

export const PERFORMANCE_THRESHOLDS = {
  RESPONSE_TIME_RATIO: 1.2,
  ERROR_RATE_CHANGE: 0.05,
  THROUGHPUT_CHANGE: -0.1
};

export class PerformanceRuleEvaluator extends BaseRuleEvaluator<PerformanceMetrics> {
  protected async doEvaluate(state: SystemState, metrics: PerformanceMetrics): Promise<RuleContext[]> {
    const contexts: RuleContext[] = [];

    if (metrics.responseTimeRatio > PERFORMANCE_THRESHOLDS.RESPONSE_TIME_RATIO) {
      contexts.push({
        reason: 'High response time',
        priority: this.calculatePriority(metrics.responseTimeRatio)
      });
    }

    if (metrics.errorRateChange > PERFORMANCE_THRESHOLDS.ERROR_RATE_CHANGE) {
      contexts.push({
        reason: 'Increasing error rate',
        priority: this.calculatePriority(metrics.errorRateChange * 2)
      });
    }

    return contexts;
  }

  protected getRuleType(): string {
    return 'performance';
  }

  private calculatePriority(ratio: number): number {
    return Math.min(Math.floor(ratio * 8), 10);
  }
}

export function createPerformanceRuleEvaluator(): PerformanceRuleEvaluator {
  return new PerformanceRuleEvaluator();
}