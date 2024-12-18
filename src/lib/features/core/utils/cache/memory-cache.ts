import type { CacheOptions, CacheProvider } from './types';

class MemoryCache implements CacheProvider {
  private cache: Map<string, { value: any; expires: number }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    
    if (!item) return null;
    if (item.expires && item.expires < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    const expires = options.ttl ? Date.now() + options.ttl : 0;
    this.cache.set(key, { value, expires });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

export const memoryCache = new MemoryCache();