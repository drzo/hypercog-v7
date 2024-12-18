export * from './types';
export * from './local-storage';

import { LocalStorage } from './local-storage';

// Export default storage instance
export const storage = new LocalStorage('app_');