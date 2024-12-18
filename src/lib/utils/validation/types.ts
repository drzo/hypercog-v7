export type ValidationRule = (value: any) => string | null;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}