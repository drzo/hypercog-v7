import { writable } from 'svelte/store';
export function createForm(initialState) {
    const { subscribe, update } = writable(initialState);
    function validate(fieldName) {
        update(state => {
            const newState = { ...state };
            const fields = fieldName ? [fieldName] : Object.keys(state);
            fields.forEach(field => {
                const { value, rules } = state[field];
                let error = null;
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
    function setValue(fieldName, value) {
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
