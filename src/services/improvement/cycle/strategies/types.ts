import type { SystemState, ImprovementAction } from '../../../../types';

export interface ImprovementStrategy {
  name: string;
  analyze(
    currentState: SystemState,
    previousState: SystemState | null
  ): Promise<ImprovementAction[]>;
}

export interface StrategyFactory {
  createStrategy(type?: string): ImprovementStrategy;
}