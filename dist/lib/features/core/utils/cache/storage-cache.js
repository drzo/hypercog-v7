import { storageService } from '../../services';
class StorageCache {
    getKey(key, namespace) {
        return namespace ? `${namespace}:${key}` : key;
    }
    async get(key) {
        const data = storageService.get(key);
        if (!data)
            return null;
        if (data.expires && data.expires < Date.now()) {
            await this.delete(key);
            return null;
        }
        return data.value;
    }
    async set(key, value, options = {}) {
        const expires = options.ttl ? Date.now() + options.ttl : 0;
        const cacheKey = this.getKey(key, options.namespace);
        storageService.set(cacheKey, { value, expires });
    }
    async delete(key) {
        storageService.remove(key);
    }
    async clear() {
        storageService.clear();
    }
}
export const storageCache = new StorageCache();
