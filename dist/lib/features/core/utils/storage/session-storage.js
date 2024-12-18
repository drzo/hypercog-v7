export class SessionStorage {
    prefix;
    constructor(prefix = '') {
        this.prefix = prefix;
    }
    getKey(key) {
        return this.prefix + key;
    }
    get(key) {
        try {
            const item = sessionStorage.getItem(this.getKey(key));
            return item ? JSON.parse(item) : null;
        }
        catch {
            return null;
        }
    }
    set(key, value) {
        try {
            sessionStorage.setItem(this.getKey(key), JSON.stringify(value));
        }
        catch (error) {
            console.error('Error saving to sessionStorage:', error);
        }
    }
    remove(key) {
        sessionStorage.removeItem(this.getKey(key));
    }
    clear() {
        const keys = Object.keys(sessionStorage);
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                sessionStorage.removeItem(key);
            }
        });
    }
}
