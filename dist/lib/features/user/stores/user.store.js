import { writable } from 'svelte/store';
import { userService } from '../services';
function createUserStore() {
    const { subscribe, set, update } = writable({
        profile: null,
        loading: false,
        error: null
    });
    return {
        subscribe,
        loadProfile: async () => {
            update(state => ({ ...state, loading: true }));
            try {
                const profile = await userService.getProfile();
                update(state => ({ ...state, profile, loading: false }));
            }
            catch (error) {
                update(state => ({
                    ...state,
                    error: error instanceof Error ? error.message : 'Failed to load profile',
                    loading: false
                }));
            }
        },
        updateProfile: async (data) => {
            update(state => ({ ...state, loading: true }));
            try {
                const profile = await userService.updateProfile(data);
                update(state => ({ ...state, profile, loading: false }));
            }
            catch (error) {
                update(state => ({
                    ...state,
                    error: error instanceof Error ? error.message : 'Failed to update profile',
                    loading: false
                }));
            }
        }
    };
}
export const userStore = createUserStore();
