import type { ValidationRule } from '../../utils/validation/types';

export interface FormField<T = any> {
  value: T;
  error: string | null;
  touched: boolean;
  rules: ValidationRule[];
}

export interface FormState {
  [key: string]: FormField;
}

export interface FormOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
}