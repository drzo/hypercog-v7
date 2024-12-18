export type NoteType = 'improvement' | 'degradation' | 'failure';
export type GoalType = 'improvement' | 'diagnostics' | 'rollback';

export interface Note2Self {
  id: string;
  timestamp: string;
  type: NoteType;
  description: string;
  changes: {
    component: string;
    before: any;
    after: any;
  }[];
  metrics?: {
    before: Record<string, number>;
    after: Record<string, number>;
  };
  goals?: {
    type: GoalType;
    description: string;
    priority: number;
  }[];
}