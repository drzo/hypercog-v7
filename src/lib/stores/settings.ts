import { writable } from 'svelte/store';
import type { SettingsState, UserPreferences, ProfileUpdateData } from '$lib/types/settings';
import { storage } from '$lib/utils/storage';
import { STORAGE_KEYS } from '$lib/config/constants';
import { fetchApi } from '$lib/utils/api';
import { logger } from '$lib/utils/logger';
import { toasts } from '$lib/stores/toast';

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  emailNotifications: true,
  language: 'en'
};

function createSettingsStore() {
  const initialState: SettingsState = {
    preferences: storage.get(STORAGE_KEYS.USER_PREFERENCES) || DEFAULT_PREFERENCES,
    loading: false,
    error: null
  };

  const { subscribe, set, update } = writable<SettingsState>(initialState);

  return {
    subscribe,
    updatePreferences: async (preferences: Partial<UserPreferences>) => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetchApi('/settings/preferences', {
          method: 'PATCH',
          body: JSON.stringify(preferences)
        });

        if (response.error) throw new Error(response.error);

        const updatedPreferences = { ...initialState.preferences, ...preferences };
        storage.set(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
        update(state => ({
          ...state,
          preferences: updatedPreferences,
          loading: false
        }));
        
        toasts.add('success', 'Preferences updated successfully');
      } catch (error) {
        logger.error('Failed to update preferences', error);
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to update preferences'
        }));
        toasts.add('error', 'Failed to update preferences');
      }
    },
    
    updateProfile: async (data: ProfileUpdateData) => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, value);
          }
        });

        const response = await fetchApi('/settings/profile', {
          method: 'PATCH',
          body: formData
        });

        if (response.error) throw new Error(response.error);
        
        update(state => ({ ...state, loading: false }));
        toasts.add('success', 'Profile updated successfully');
      } catch (error) {
        logger.error('Failed to update profile', error);
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to update profile'
        }));
        toasts.add('error', 'Failed to update profile');
      }
    }
  };
}

export const settings = createSettingsStore();