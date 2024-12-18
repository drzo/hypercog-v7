import { writable } from 'svelte/store';
export function useAsync(asyncFn) {
    const state = writable({
        data: null,
        loading: false,
        error: null
    });
    async function execute(...args) {
        state.update(s => ({ ...s, loading: true }));
        try {
            const data = await asyncFn(...args);
            state.update(s => ({ ...s, data, loading: false, error: null }));
            return data;
        }
        catch (error) {
            state.update(s => ({
                ...s,
                error: error instanceof Error ? error : new Error('Unknown error'),
                loading: false
            }));
            throw error;
        }
    }
    return {
        subscribe: state.subscribe,
        execute
    };
}
