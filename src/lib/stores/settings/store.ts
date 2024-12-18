import { writable } from 'svelte/store';
import type { SettingsState, UserPreferences, ProfileUpdateData } from './types';
import { getDefaultPreferences } from './utils';
import { storage } from '$lib/utils/storage';
import { STORAGE_KEYS } from '$lib/config/constants';

function createSettingsStore() {
  const initialState: SettingsState = {
    preferences: storage.get(STORAGE_KEYS.USER_PREFERENCES) || getDefaultPreferences(),
    loading: false,
    error: null
  };

  const { subscribe, set, update } = writable<SettingsState>(initialState);

  return {
    subscribe,
    updatePreferences: async (preferences: Partial<UserPreferences>) => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const updatedPreferences = { ...initialState.preferences, ...preferences };
        storage.set(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
        update(state => ({
          ...state,
          preferences: updatedPreferences,
          loading: false
        }));
      } catch (error) {
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to update preferences'
        }));
      }
    },
    updateProfile: async (data: ProfileUpdateData) => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        // Implement profile update logic here
        update(state => ({ ...state, loading: false }));
      } catch (error) {
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