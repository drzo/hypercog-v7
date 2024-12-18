import type { SystemState, ImprovementAction, Note2Self } from '../../../types';
import type { SystemAnalyzer } from '../types';
import { analyzeSystemMetrics } from './metrics/system';
import { evaluateSystemRules } from './rules/system';
import { loggerService } from '../../logger.service';

export class SystemAnalyzerImpl implements SystemAnalyzer {
  async analyze(
    currentState: SystemState,
    previousState: SystemState | null,
    latestNote?: Note2Self
  ): Promise<ImprovementAction[]> {
    try {
      // Analyze current metrics
      const metricsAnalysis = await analyzeSystemMetrics(currentState, previousState);
      
      // Evaluate rules based on metrics
      const { improvements } = await evaluateSystemRules(currentState, metricsAnalysis);

      // Filter and prioritize improvements based on latest note goals
      const prioritizedImprovements = this.prioritizeImprovements(improvements, latestNote);

      loggerService.info('System analysis completed', {
        totalImprovements: improvements.length,
        prioritizedImprovements: prioritizedImprovements.length,
        metrics: metricsAnalysis
      });

      return prioritizedImprovements;
    } catch (error) {
      loggerService.error('System analysis failed', error);
      throw error;
    }
  }

  private prioritizeImprovements(
    improvements: ImprovementAction[],
    latestNote?: Note2Self
  ): ImprovementAction[] {
    if (!latestNote?.goals) {
      return improvements;
    }

    // Score improvements based on alignment with goals
    return improvements
      .map(improvement => ({
        improvement,
        score: this.calculateAlignmentScore(improvement, latestNote.goals!)
      }))
      .sort((a, b) => b.score - a.score)
      .map(({ improvement }) => improvement);
  }

  private calculateAlignmentScore(
    improvement: ImprovementAction,
    goals: Note2Self['goals']
  ): number {
    return goals.reduce((score, goal) => {
      // Higher score for matching goal types
      if (improvement.type === goal.type) {
        score += 2;
      }

      // Additional score for description similarity
      if (improvement.description.toLowerCase().includes(goal.description.toLowerCase())) {
        score += 3;
      }

      // Factor in goal priority
      score *= (goal.priority / 10);

      return score;
    }, 0);
  }
}

export function createSystemAnalyzer(): SystemAnalyzer {
  return new SystemAnalyzerImpl();
}