export class StorageCache {
    storage;
    prefix;
    constructor(options = {}) {
        this.storage = options.storage || localStorage;
        this.prefix = options.prefix || 'app_cache_';
    }
    getKey(key) {
        return this.prefix + key;
    }
    set(key, value, ttl) {
        const item = {
            value,
            expires: ttl ? Date.now() + ttl : null
        };
        try {
            this.storage.setItem(this.getKey(key), JSON.stringify(item));
        }
        catch (error) {
            console.error('Error saving to storage:', error);
        }
    }
    get(key) {
        try {
            const item = this.storage.getItem(this.getKey(key));
            if (!item)
                return null;
            const { value, expires } = JSON.parse(item);
            if (expires && expires < Date.now()) {
                this.delete(key);
                return null;
            }
            return value;
        }
        catch {
            return null;
        }
    }
    delete(key) {
        this.storage.removeItem(this.getKey(key));
    }
    clear() {
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (key?.startsWith(this.prefix)) {
                this.storage.removeItem(key);
            }
        }
    }
}
export const storageCache = new StorageCache();
