import type { CacheOptions, CacheProvider } from './types';
import { storageService } from '../../services';

class StorageCache implements CacheProvider {
  private getKey(key: string, namespace?: string): string {
    return namespace ? `${namespace}:${key}` : key;
  }

  async get<T>(key: string): Promise<T | null> {
    const data = storageService.get<{ value: T; expires: number }>(key);
    
    if (!data) return null;
    if (data.expires && data.expires < Date.now()) {
      await this.delete(key);
      return null;
    }
    
    return data.value;
  }

  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    const expires = options.ttl ? Date.now() + options.ttl : 0;
    const cacheKey = this.getKey(key, options.namespace);
    
    storageService.set(cacheKey, { value, expires });
  }

  async delete(key: string): Promise<void> {
    storageService.remove(key);
  }

  async clear(): Promise<void> {
    storageService.clear();
  }
}

export const storageCache = new StorageCache();