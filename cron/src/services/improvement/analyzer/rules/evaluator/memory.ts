import { BaseRuleEvaluator } from './base';
import type { SystemState } from '../../../../../types';
import type { MemoryMetrics } from '../../metrics/types';
import type { RuleContext } from '../types';

export const MEMORY_THRESHOLDS = {
  HEAP_USAGE: 0.85,
  FRAGMENTATION: 0.3,
  GC_FREQUENCY: 10
};

export class MemoryRuleEvaluator extends BaseRuleEvaluator<MemoryMetrics> {
  protected async doEvaluate(state: SystemState, metrics: MemoryMetrics): Promise<RuleContext[]> {
    const contexts: RuleContext[] = [];

    if (metrics.heapUsageRatio > MEMORY_THRESHOLDS.HEAP_USAGE) {
      contexts.push({
        reason: 'High heap usage',
        priority: this.calculatePriority(metrics.heapUsageRatio)
      });
    }

    if (metrics.heapFragmentation > MEMORY_THRESHOLDS.FRAGMENTATION) {
      contexts.push({
        reason: 'High heap fragmentation',
        priority: this.calculatePriority(metrics.heapFragmentation)
      });
    }

    return contexts;
  }

  protected getRuleType(): string {
    return 'memory';
  }

  private calculatePriority(ratio: number): number {
    return Math.min(Math.floor(ratio * 10), 10);
  }
}

export function createMemoryRuleEvaluator(): MemoryRuleEvaluator {
  return new MemoryRuleEvaluator();
}