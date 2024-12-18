import type { SystemState, ImprovementAction, Note2Self } from '../../../types';
import { createMetricsAnalyzer } from './metrics';
import { createRuleEngine } from './rules';
import { createPrioritizer } from './prioritizer';
import { loggerService } from '../../logger.service';

export class SystemAnalyzer {
  private readonly metricsAnalyzer;
  private readonly ruleEngine;
  private readonly prioritizer;

  constructor() {
    this.metricsAnalyzer = createMetricsAnalyzer();
    this.ruleEngine = createRuleEngine();
    this.prioritizer = createPrioritizer();
  }

  async analyze(
    currentState: SystemState,
    previousState: SystemState | null,
    latestNote?: Note2Self
  ): Promise<ImprovementAction[]> {
    try {
      // Analyze system metrics
      const metricsAnalysis = await this.metricsAnalyzer.analyze(currentState, previousState);

      // Generate improvements based on rules
      const improvements = await this.ruleEngine.evaluate(currentState, metricsAnalysis);

      // Prioritize improvements based on latest note goals
      const prioritizedImprovements = this.prioritizer.prioritize(improvements, latestNote);

      loggerService.info('System analysis completed', {
        metrics: metricsAnalysis,
        improvements: improvements.length,
        prioritized: prioritizedImprovements.length
      });

      return prioritizedImprovements;
    } catch (error) {
      loggerService.error('System analysis failed', error);
      throw error;
    }
  }
}

export function createSystemAnalyzer(): SystemAnalyzer {
  return new SystemAnalyzer();
}