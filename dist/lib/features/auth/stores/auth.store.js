import { writable } from 'svelte/store';
import { authService } from '../services/auth.service';
import { loggerService } from '$lib/features/core/services';
function createAuthStore() {
    const { subscribe, set, update } = writable({
        user: null,
        loading: false,
        error: null
    });
    return {
        subscribe,
        login: async (email, password) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                const user = await authService.login(email, password);
                update(state => ({ ...state, user, loading: false }));
            }
            catch (error) {
                loggerService.error('Login failed', error);
                update(state => ({
                    ...state,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Login failed'
                }));
            }
        },
        logout: async () => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                await authService.logout();
                set({ user: null, loading: false, error: null });
            }
            catch (error) {
                loggerService.error('Logout failed', error);
                update(state => ({
                    ...state,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Logout failed'
                }));
            }
        }
    };
}
export const auth = createAuthStore();
