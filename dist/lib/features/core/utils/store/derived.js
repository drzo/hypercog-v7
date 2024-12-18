import { derived } from 'svelte/store';
export function deriveFrom(store, fn) {
    return derived(store, ($state) => ({
        data: fn($state.data),
        loading: $state.loading,
        error: $state.error
    }));
}
export function filterStore(store, predicate) {
    return derived(store, ($state) => ({
        data: $state.data.filter(predicate),
        loading: $state.loading,
        error: $state.error
    }));
}
export function mapStore(store, transform) {
    return derived(store, ($state) => ({
        data: $state.data.map(transform),
        loading: $state.loading,
        error: $state.error
    }));
}
export function selectFromStore(store, key) {
    return derived(store, ($state) => ({
        data: $state.data[key],
        loading: $state.loading,
        error: $state.error
    }));
}
