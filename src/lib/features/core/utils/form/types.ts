import type { ValidationRule } from '../../types';

export interface FormField<T = any> {
  value: T;
  error: string | null;
  touched: boolean;
  rules: ValidationRule[];
}

export interface FormState {
  [key: string]: FormField;
}