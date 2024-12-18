export type ValidationRule = (value: any) => string | null;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const required: ValidationRule = (value) => {
  return value?.toString().trim() ? null : 'This field is required';
};

export const email: ValidationRule = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : 'Invalid email address';
};

export function validate(value: any, rules: ValidationRule[]): ValidationResult {
  const errors: string[] = [];
  
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      errors.push(error);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}