import { writable } from 'svelte/store';
import { httpService } from '../services';
export function useQuery(endpoint) {
    const state = writable({
        data: null,
        loading: false,
        error: null
    });
    async function fetch() {
        state.update(s => ({ ...s, loading: true }));
        try {
            const data = await httpService.get(endpoint);
            state.update(s => ({ ...s, data, loading: false }));
        }
        catch (error) {
            state.update(s => ({
                ...s,
                error: error instanceof Error ? error : new Error('Unknown error'),
                loading: false
            }));
        }
    }
    return {
        subscribe: state.subscribe,
        fetch
    };
}
