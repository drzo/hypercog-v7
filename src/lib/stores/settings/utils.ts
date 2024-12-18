import type { UserPreferences } from './types';

export function getDefaultPreferences(): UserPreferences {
  return {
    theme: 'system',
    emailNotifications: true,
    language: 'en'
  };
}