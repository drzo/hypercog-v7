class MemoryCache {
    cache = new Map();
    async get(key) {
        const item = this.cache.get(key);
        if (!item)
            return null;
        if (item.expires && item.expires < Date.now()) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    }
    async set(key, value, options = {}) {
        const expires = options.ttl ? Date.now() + options.ttl : 0;
        this.cache.set(key, { value, expires });
    }
    async delete(key) {
        this.cache.delete(key);
    }
    async clear() {
        this.cache.clear();
    }
}
export const memoryCache = new MemoryCache();
