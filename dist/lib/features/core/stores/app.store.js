import { writable } from 'svelte/store';
const initialState = {
    initialized: false,
    error: null
};
function createAppStore() {
    const { subscribe, update, set } = writable(initialState);
    return {
        subscribe,
        initialize: () => update(state => ({ ...state, initialized: true })),
        setError: (error) => update(state => ({ ...state, error })),
        reset: () => set(initialState)
    };
}
export const app = createAppStore();
