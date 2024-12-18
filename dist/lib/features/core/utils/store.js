import { writable } from 'svelte/store';
export function createStore(initialData = null) {
    const { subscribe, set, update } = writable({
        data: initialData,
        loading: false,
        error: null
    });
    return {
        subscribe,
        setData: (data) => update(state => ({ ...state, data })),
        setLoading: (loading) => update(state => ({ ...state, loading })),
        setError: (error) => update(state => ({ ...state, error })),
        reset: () => set({ data: initialData, loading: false, error: null })
    };
}
