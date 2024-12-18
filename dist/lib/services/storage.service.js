class LocalStorageService {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        catch {
            return null;
        }
    }
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}
export const storageService = new LocalStorageService();
