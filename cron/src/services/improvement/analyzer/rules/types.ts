import type { ImprovementAction } from '../../../../types';

export interface RuleContext {
  reason: string;
  priority: number;
}

export interface Rule {
  evaluate(context: RuleContext): ImprovementAction[];
}

export interface RuleSet {
  rules: Rule[];
  evaluate(context: RuleContext): Promise<ImprovementAction[]>;
}