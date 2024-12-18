import { loggerService } from '$lib/features/core/services';
export class StorageUtil {
    prefix = 'hypercog_';
    async save(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(this.getKey(key), serialized);
        }
        catch (error) {
            loggerService.error('Failed to save data', { key, error });
            throw error;
        }
    }
    async load(key) {
        try {
            const serialized = localStorage.getItem(this.getKey(key));
            return serialized ? JSON.parse(serialized) : null;
        }
        catch (error) {
            loggerService.error('Failed to load data', { key, error });
            return null;
        }
    }
    async remove(key) {
        localStorage.removeItem(this.getKey(key));
    }
    getKey(key) {
        return `${this.prefix}${key}`;
    }
}
export const storage = new StorageUtil();
