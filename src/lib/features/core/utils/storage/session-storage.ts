import type { Storage } from './types';

export class SessionStorage implements Storage {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return this.prefix + key;
  }

  get<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(this.getKey(key), JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  }

  remove(key: string): void {
    sessionStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        sessionStorage.removeItem(key);
      }
    });
  }
}