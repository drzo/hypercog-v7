import type { SystemState } from '../../../../types/state';
import type { ImprovementAction } from '../../../../types/improvement';
import { loggerService } from '../../../logger.service';
import { analyzeResponseTime } from './performance/response-time';
import { analyzeErrorRate } from './performance/error-rate';
import { analyzeThroughput } from './performance/throughput';

export class PerformanceAnalyzer {
  analyze(currentState: SystemState, previousState: SystemState | null): ImprovementAction[] {
    try {
      return [
        ...analyzeResponseTime(currentState),
        ...analyzeErrorRate(currentState),
        ...analyzeThroughput(currentState, previousState)
      ];
    } catch (error) {
      loggerService.error('Performance analysis failed', error);
      return [];
    }
  }
}

export const performanceAnalyzer = new PerformanceAnalyzer();