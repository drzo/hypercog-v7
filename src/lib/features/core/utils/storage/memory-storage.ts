import type { Storage } from './types';

export class MemoryStorage implements Storage {
  private storage = new Map<string, string>();
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return this.prefix + key;
  }

  get<T>(key: string): T | null {
    try {
      const item = this.storage.get(this.getKey(key));
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.set(this.getKey(key), JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to memory storage:', error);
    }
  }

  remove(key: string): void {
    this.storage.delete(this.getKey(key));
  }

  clear(): void {
    const keys = Array.from(this.storage.keys());
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        this.storage.delete(key);
      }
    });
  }
}