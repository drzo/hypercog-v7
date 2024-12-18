export interface Storage {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}

class LocalStorage implements Storage {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return this.prefix + key;
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    localStorage.clear();
  }
}

export const storage = new LocalStorage('app_');