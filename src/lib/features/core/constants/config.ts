export const APP_CONFIG = {
  name: 'HyperCog',
  description: 'Self-Improving System',
  version: '0.1.0'
} as const;

export const STORAGE_CONFIG = {
  prefix: 'hypercog_',
  version: '1'
} as const;

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
  retries: 3
} as const;