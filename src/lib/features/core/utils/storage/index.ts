export * from './types';
export * from './local-storage';
export * from './session-storage';
export * from './memory-storage';

// Create and export default storage instance
import { LocalStorage } from './local-storage';
import { STORAGE_CONFIG } from '../../constants/storage';

export const storage = new LocalStorage(STORAGE_CONFIG.prefix);