export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_PREFERENCES: 'user_preferences',
    THEME: 'theme'
};
export const STORAGE_CONFIG = {
    prefix: 'app_',
    version: '1'
};
export const FILE_CONFIG = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_TYPES: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf'
    ]
};
