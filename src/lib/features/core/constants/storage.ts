export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme'
} as const;

export const STORAGE_CONFIG = {
  prefix: 'app_',
  version: '1'
} as const;

export const FILE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf'
  ] as const
} as const;