export class MemoryStorage {
    storage = new Map();
    prefix;
    constructor(prefix = '') {
        this.prefix = prefix;
    }
    getKey(key) {
        return this.prefix + key;
    }
    get(key) {
        try {
            const item = this.storage.get(this.getKey(key));
            return item ? JSON.parse(item) : null;
        }
        catch {
            return null;
        }
    }
    set(key, value) {
        try {
            this.storage.set(this.getKey(key), JSON.stringify(value));
        }
        catch (error) {
            console.error('Error saving to memory storage:', error);
        }
    }
    remove(key) {
        this.storage.delete(this.getKey(key));
    }
    clear() {
        const keys = Array.from(this.storage.keys());
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                this.storage.delete(key);
            }
        });
    }
}
