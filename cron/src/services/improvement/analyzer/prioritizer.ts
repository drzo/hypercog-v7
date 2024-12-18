import type { ImprovementAction, Note2Self } from '../../../types';
import { loggerService } from '../../logger.service';

export class ImprovementPrioritizer {
  prioritize(
    improvements: ImprovementAction[],
    latestNote?: Note2Self
  ): ImprovementAction[] {
    if (!latestNote?.goals) {
      return improvements;
    }

    try {
      const prioritized = improvements
        .map(improvement => ({
          improvement,
          score: this.calculateAlignmentScore(improvement, latestNote.goals!)
        }))
        .sort((a, b) => b.score - a.score)
        .map(({ improvement }) => improvement);

      loggerService.info('Improvements prioritized', {
        total: improvements.length,
        prioritized: prioritized.length,
        goals: latestNote.goals.length
      });

      return prioritized;
    } catch (error) {
      loggerService.error('Failed to prioritize improvements', error);
      return improvements;
    }
  }

  private calculateAlignmentScore(
    improvement: ImprovementAction,
    goals: Note2Self['goals']
  ): number {
    return goals.reduce((score, goal) => {
      if (improvement.type === goal.type) score += 2;
      if (this.descriptionMatches(improvement.description, goal.description)) score += 3;
      return score * (goal.priority / 10);
    }, 0);
  }

  private descriptionMatches(improvementDesc: string, goalDesc: string): boolean {
    return improvementDesc.toLowerCase().includes(goalDesc.toLowerCase());
  }
}

export function createPrioritizer(): ImprovementPrioritizer {
  return new ImprovementPrioritizer();
}