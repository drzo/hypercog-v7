import type { ValidationRule } from '$lib/types';

export const required: ValidationRule = (value: any) => {
  if (value === undefined || value === null || value === '') {
    return 'This field is required';
  }
  return null;
};

export const email: ValidationRule = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Invalid email address';
  }
  return null;
};

export const minLength = (min: number): ValidationRule => (value: string) => {
  if (value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return null;
};

export const maxLength = (max: number): ValidationRule => (value: string) => {
  if (value.length > max) {
    return `Must be no more than ${max} characters`;
  }
  return null;
};