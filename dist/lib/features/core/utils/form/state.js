// Split form state management into its own module
import { writable } from 'svelte/store';
import { validateField } from './validation';
export function createFormState(initialState) {
    const { subscribe, update } = writable(initialState);
    return {
        subscribe,
        setFieldValue: (field, value) => {
            update(state => ({
                ...state,
                [field]: {
                    ...state[field],
                    value,
                    touched: true,
                    error: validateField(value, state[field].rules)
                }
            }));
        },
        setFieldError: (field, error) => {
            update(state => ({
                ...state,
                [field]: {
                    ...state[field],
                    error
                }
            }));
        },
        reset: () => update(() => initialState)
    };
}
