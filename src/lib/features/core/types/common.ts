export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ValidationRule = (value: any) => string | null;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}