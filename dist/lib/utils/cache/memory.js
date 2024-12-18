export class MemoryCache {
    cache;
    maxSize;
    constructor(options = {}) {
        this.cache = new Map();
        this.maxSize = options.maxSize || 1000;
    }
    set(key, value, ttl) {
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, {
            value,
            expires: ttl ? Date.now() + ttl : Infinity
        });
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return null;
        if (entry.expires < Date.now()) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
    has(key) {
        return this.get(key) !== null;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
}
export const memoryCache = new MemoryCache();
