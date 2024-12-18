import type { SystemState, ImprovementAction } from '../../../../types';
import type { SystemMetricsAnalysis } from '../metrics/system';
import { evaluateMemoryRules } from './memory';
import { evaluatePerformanceRules } from './performance';
import { sortImprovements } from '../../utils';
import { loggerService } from '../../../logger.service';

export interface RuleEvaluationResult {
  improvements: ImprovementAction[];
  metrics: {
    memory: Record<string, number>;
    performance: Record<string, number>;
  };
  timestamp: string;
}

export async function evaluateSystemRules(
  state: SystemState,
  analysis: SystemMetricsAnalysis
): Promise<RuleEvaluationResult> {
  try {
    // Evaluate all rules in parallel
    const [memoryImprovements, performanceImprovements] = await Promise.all([
      evaluateMemoryRules(state, analysis.memory),
      evaluatePerformanceRules(state, analysis.performance)
    ]);

    const improvements = sortImprovements([
      ...memoryImprovements,
      ...performanceImprovements
    ]);

    const result: RuleEvaluationResult = {
      improvements,
      metrics: {
        memory: {
          heapUsageRatio: analysis.memory.heapUsageRatio,
          heapFragmentation: analysis.memory.heapFragmentation,
          gcFrequency: analysis.memory.gcFrequency
        },
        performance: {
          responseTimeRatio: analysis.performance.responseTimeRatio,
          errorRateChange: analysis.performance.errorRateChange,
          throughputChange: analysis.performance.throughputChange
        }
      },
      timestamp: new Date().toISOString()
    };

    loggerService.info('System rules evaluated', {
      totalImprovements: improvements.length,
      byType: improvements.reduce((acc, imp) => {
        acc[imp.type] = (acc[imp.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      metrics: result.metrics
    });

    return result;
  } catch (error) {
    loggerService.error('Failed to evaluate system rules', error);
    throw error;
  }
}