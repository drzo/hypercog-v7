import { writable } from 'svelte/store';
function createLoadingStore() {
    const { subscribe, update } = writable(new Set());
    return {
        subscribe,
        startLoading: (key) => update(state => {
            state.add(key);
            return state;
        }),
        stopLoading: (key) => update(state => {
            state.delete(key);
            return state;
        }),
        isLoading: (key) => {
            let loading = false;
            subscribe(state => {
                loading = state.has(key);
            })();
            return loading;
        }
    };
}
export const loading = createLoadingStore();
