import { writable } from 'svelte/store';
import { getDefaultPreferences } from './utils';
import { storage } from '$lib/utils/storage';
import { STORAGE_KEYS } from '$lib/config/constants';
function createSettingsStore() {
    const initialState = {
        preferences: storage.get(STORAGE_KEYS.USER_PREFERENCES) || getDefaultPreferences(),
        loading: false,
        error: null
    };
    const { subscribe, set, update } = writable(initialState);
    return {
        subscribe,
        updatePreferences: async (preferences) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                const updatedPreferences = { ...initialState.preferences, ...preferences };
                storage.set(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
                update(state => ({
                    ...state,
                    preferences: updatedPreferences,
                    loading: false
                }));
            }
            catch (error) {
                update(state => ({
                    ...state,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Failed to update preferences'
                }));
            }
        },
        updateProfile: async (data) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                // Implement profile update logic here
                update(state => ({ ...state, loading: false }));
            }
            catch (error) {
                update(state => ({
                    ...state,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Failed to update profile'
                }));
            }
        }
    };
}
export const settings = createSettingsStore();
