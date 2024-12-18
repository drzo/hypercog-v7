import { storageService } from '$lib/features/core/services';
import { STORAGE_KEYS } from '$lib/features/core/constants';
export function loadPreferences() {
    return storageService.get(STORAGE_KEYS.USER_PREFERENCES) || getDefaultPreferences();
}
export function savePreferences(preferences) {
    storageService.set(STORAGE_KEYS.USER_PREFERENCES, preferences);
}
export function getDefaultPreferences() {
    return {
        theme: 'system',
        emailNotifications: true,
        language: 'en'
    };
}
