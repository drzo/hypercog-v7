export type NoteType = 'improvement' | 'degradation' | 'failure';
export type GoalType = 'improvement' | 'diagnostics' | 'rollback';

export interface Change {
  component: string;
  before: any;
  after: any;
}

export interface Metrics {
  before: Record<string, number>;
  after: Record<string, number>;
}

export interface Goal {
  type: GoalType;
  description: string;
  priority: number;
}

export interface Note2Self {
  id: string;
  timestamp: string;
  type: NoteType;
  description: string;
  changes: Change[];
  metrics?: Metrics;
  goals?: Goal[];
}