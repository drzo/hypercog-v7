import { writable } from 'svelte/store';
import { apiClient } from './client';
export function createQuery(endpoint) {
    const state = writable({
        data: null,
        loading: false,
        error: null
    });
    async function fetch() {
        state.update(s => ({ ...s, loading: true }));
        try {
            const data = await apiClient.get(endpoint);
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
export function createPaginatedQuery(endpoint) {
    const state = writable({
        data: null,
        loading: false,
        error: null
    });
    async function fetch(page, pageSize) {
        state.update(s => ({ ...s, loading: true }));
        try {
            const data = await apiClient.get(`${endpoint}?page=${page}&pageSize=${pageSize}`);
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
