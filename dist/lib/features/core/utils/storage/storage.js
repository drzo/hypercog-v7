export class LocalStorage {
    prefix;
    constructor(prefix = '') {
        this.prefix = prefix;
    }
    getKey(key) {
        return this.prefix + key;
    }
    get(key) {
        try {
            const item = localStorage.getItem(this.getKey(key));
            return item ? JSON.parse(item) : null;
        }
        catch {
            return null;
        }
    }
    set(key, value) {
        try {
            localStorage.setItem(this.getKey(key), JSON.stringify(value));
        }
        catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    remove(key) {
        localStorage.removeItem(this.getKey(key));
    }
    clear() {
        localStorage.clear();
    }
}
export const storage = new LocalStorage('app_');
