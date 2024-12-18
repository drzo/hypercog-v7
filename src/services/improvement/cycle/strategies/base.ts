import type { ImprovementAction, SystemState } from '../../../../types';
import { loggerService } from '../../../logger.service';

export abstract class ImprovementStrategy {
  abstract name: string;

  async analyze(currentState: SystemState, previousState: SystemState | null): Promise<ImprovementAction[]> {
    try {
      loggerService.info(`Analyzing system with ${this.name} strategy`);
      return await this.doAnalyze(currentState, previousState);
    } catch (error) {
      loggerService.error(`Strategy ${this.name} analysis failed`, error);
      throw error;
    }
  }

  protected abstract doAnalyze(
    currentState: SystemState,
    previousState: SystemState | null
  ): Promise<ImprovementAction[]>;
}