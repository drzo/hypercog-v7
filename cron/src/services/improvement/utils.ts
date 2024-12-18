import type { ImprovementAction } from '../../types';

export function sortImprovements(improvements: ImprovementAction[]): ImprovementAction[] {
  return improvements.sort((a, b) => {
    const scoreA = a.priority * 0.6 + a.estimatedImpact * 0.4;
    const scoreB = b.priority * 0.6 + b.estimatedImpact * 0.4;
    return scoreB - scoreA;
  });
}

export function generateImprovementId(): string {
  return crypto.randomUUID();
}