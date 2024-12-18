import { writable } from 'svelte/store';
import { storage } from '$lib/utils/storage';
import { STORAGE_KEYS } from '$lib/config/constants';
import { fetchApi } from '$lib/utils/api';
import { logger } from '$lib/utils/logger';
function createAuthStore() {
    const initialState = {
        user: storage.get(STORAGE_KEYS.AUTH_TOKEN),
        loading: false,
        error: null
    };
    const { subscribe, set, update } = writable(initialState);
    return {
        subscribe,
        login: async (credentials) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                const response = await fetchApi('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials)
                });
                if (response.error)
                    throw new Error(response.error);
                if (!response.data)
                    throw new Error('No data received');
                storage.set(STORAGE_KEYS.AUTH_TOKEN, response.data);
                update(state => ({ ...state, user: response.data, loading: false }));
            }
            catch (error) {
                logger.error('Login failed', error);
                update(state => ({
                    ...state,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Login failed'
                }));
            }
        },
        logout: () => {
            storage.remove(STORAGE_KEYS.AUTH_TOKEN);
            set({ user: null, loading: false, error: null });
        }
    };
}
export const auth = createAuthStore();
