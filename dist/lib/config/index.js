// Centralized configuration exports
export * from './app';
export * from './navigation';
export * from './constants';
// Add environment-specific configuration
export const ENV = {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    apiUrl: import.meta.env.VITE_API_BASE_URL || '',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0'
};
