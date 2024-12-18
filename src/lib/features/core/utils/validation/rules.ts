import type { ValidationRule } from './types';

export const required: ValidationRule = (value: any) => {
  if (value === undefined || value === null || value === '') {
    return 'This field is required';
  }
  return null;
};

export const email: ValidationRule = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : 'Invalid email address';
};

export const minLength = (min: number): ValidationRule => (value: string) => {
  return value.length >= min ? null : `Must be at least ${min} characters`;
};

export const maxLength = (max: number): ValidationRule => (value: string) => {
  return value.length <= max ? null : `Must be no more than ${max} characters`;
};