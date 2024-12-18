// Split form validation logic into its own module
import type { ValidationRule } from '../../types';

export function validateField(value: any, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
}

export function validateForm(values: Record<string, any>, rules: Record<string, ValidationRule[]>): Record<string, string | null> {
  const errors: Record<string, string | null> = {};
  
  Object.entries(rules).forEach(([field, fieldRules]) => {
    errors[field] = validateField(values[field], fieldRules);
  });
  
  return errors;
}