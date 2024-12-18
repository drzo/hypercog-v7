interface CacheOptions {
  ttl?: number;
  maxSize?: number;
}

interface CacheEntry<T> {
  value: T;
  expires: number;
}

export class MemoryCache {
  private cache: Map<string, CacheEntry<any>>;
  private maxSize: number;

  constructor(options: CacheOptions = {}) {
    this.cache = new Map();
    this.maxSize = options.maxSize || 1000;
  }

  set<T>(key: string, value: T, ttl?: number): void {
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      expires: ttl ? Date.now() + ttl : Infinity
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    if (entry.expires < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.value;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const memoryCache = new MemoryCache();