import type { UserPreferences } from '../types';
import { storageService } from '$lib/features/core/services';
import { STORAGE_KEYS } from '$lib/features/core/constants';

export function loadPreferences(): UserPreferences {
  return storageService.get(STORAGE_KEYS.USER_PREFERENCES) || getDefaultPreferences();
}

export function savePreferences(preferences: UserPreferences): void {
  storageService.set(STORAGE_KEYS.USER_PREFERENCES, preferences);
}

export function getDefaultPreferences(): UserPreferences {
  return {
    theme: 'system',
    emailNotifications: true,
    language: 'en'
  };
}