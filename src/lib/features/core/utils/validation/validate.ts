import type { ValidationRule, ValidationResult, ValidationOptions } from './types';

export function validate(value: any, rules: ValidationRule[], options: ValidationOptions = {}): ValidationResult {
  const errors: string[] = [];
  
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      errors.push(error);
      if (options.stopOnFirst) {
        break;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateObject<T extends object>(
  obj: T,
  validationRules: Partial<Record<keyof T, ValidationRule[]>>,
  options: ValidationOptions = {}
): Record<keyof T, ValidationResult> {
  const results = {} as Record<keyof T, ValidationResult>;
  
  for (const key in validationRules) {
    const rules = validationRules[key] || [];
    results[key] = validate(obj[key], rules, options);
  }
  
  return results;
}