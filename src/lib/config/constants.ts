export const APP_CONFIG = {
  name: 'HyperCog',
  description: 'Self-Improving System',
  version: '0.1.0'
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme'
} as const;

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  TIMEOUT: 10000,
  RETRIES: 3
} as const;