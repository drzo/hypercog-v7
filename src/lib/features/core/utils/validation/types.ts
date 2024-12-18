export type ValidationRule = (value: any) => string | null;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationOptions {
  stopOnFirst?: boolean;
  context?: Record<string, any>;
}