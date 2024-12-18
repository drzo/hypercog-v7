import type { ImprovementAction } from '../../../types';
import { loggerService } from '../../logger.service';

export class CycleValidator {
  validate(improvement: ImprovementAction): string[] {
    const errors: string[] = [];

    try {
      this.validateBasicFields(improvement, errors);
      this.validateChanges(improvement, errors);
      this.validateMetrics(improvement, errors);

      return errors;
    } catch (error) {
      loggerService.error('Cycle validation failed', error);
      return ['Validation failed unexpectedly'];
    }
  }

  private validateBasicFields(improvement: ImprovementAction, errors: string[]): void {
    if (!improvement.id) errors.push('Missing improvement ID');
    if (!improvement.type) errors.push('Missing improvement type');
    if (!improvement.description) errors.push('Missing improvement description');
    if (improvement.priority < 0 || improvement.priority > 10) {
      errors.push('Priority must be between 0 and 10');
    }
  }

  private validateChanges(improvement: ImprovementAction, errors: string[]): void {
    if (!improvement.changes?.length) {
      errors.push('No changes specified');
      return;
    }

    improvement.changes.forEach((change, index) => {
      if (!change.path) errors.push(`Change ${index}: Missing path`);
      if (!change.after) errors.push(`Change ${index}: Missing target state`);
    });
  }

  private validateMetrics(improvement: ImprovementAction, errors: string[]): void {
    if (improvement.estimatedImpact < 0 || improvement.estimatedImpact > 10) {
      errors.push('Estimated impact must be between 0 and 10');
    }
  }
}

export function createCycleValidator(): CycleValidator {
  return new CycleValidator();
}
