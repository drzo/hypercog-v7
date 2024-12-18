import { ImprovementStrategy } from './base';
import type { ImprovementAction, SystemState } from '../../../../types';
import { systemAnalyzer } from '../../analysis';

export class DefaultStrategy extends ImprovementStrategy {
  name = 'default';

  protected async doAnalyze(
    currentState: SystemState,
    previousState: SystemState | null
  ): Promise<ImprovementAction[]> {
    return systemAnalyzer.analyze(currentState, previousState);
  }
}