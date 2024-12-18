export type ValidationRule = (value: any) => string | null;

export const required: ValidationRule = (value) => {
  return value?.toString().trim() ? null : 'This field is required';
};

export const email: ValidationRule = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : 'Invalid email address';
};

export function validate(value: any, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
}