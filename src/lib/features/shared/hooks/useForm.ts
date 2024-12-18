import { writable } from 'svelte/store';
import type { ValidationRule } from '$lib/types';

export interface FormField<T = any> {
  value: T;
  error: string | null;
  touched: boolean;
  rules: ValidationRule[];
}

export interface FormState {
  [key: string]: FormField;
}

export function useForm<T extends FormState>(initialState: T) {
  const { subscribe, update } = writable(initialState);

  function validate(fieldName?: string) {
    update(state => {
      const newState = { ...state };
      const fields = fieldName ? [fieldName] : Object.keys(state);

      fields.forEach(field => {
        const { value, rules } = state[field];
        let error: string | null = null;

        for (const rule of rules) {
          const result = rule(value);
          if (result) {
            error = result;
            break;
          }
        }

        newState[field] = {
          ...state[field],
          error,
          touched: true
        };
      });

      return newState;
    });
  }

  function setValue(fieldName: string, value: any) {
    update(state => ({
      ...state,
      [fieldName]: {
        ...state[fieldName],
        value,
        touched: true
      }
    }));
    validate(fieldName);
  }

  function reset() {
    update(() => initialState);
  }

  return {
    subscribe,
    validate,
    setValue,
    reset
  };
}