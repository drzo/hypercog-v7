import type { SystemState } from '../../../../../types';
import type { RuleContext } from '../types';
import { loggerService } from '../../../../logger.service';

export abstract class BaseRuleEvaluator<T> {
  async evaluate(state: SystemState, metrics: T): Promise<RuleContext[]> {
    try {
      const contexts = await this.doEvaluate(state, metrics);
      
      loggerService.info(`${this.getRuleType()} rules evaluated`, {
        contextCount: contexts.length,
        metrics,
        state: {
          timestamp: state.timestamp,
          type: this.getRuleType()
        }
      });

      return contexts;
    } catch (error) {
      loggerService.error(`Failed to evaluate ${this.getRuleType()} rules`, error);
      throw error;
    }
  }

  protected abstract doEvaluate(state: SystemState, metrics: T): Promise<RuleContext[]>;
  protected abstract getRuleType(): string;
}