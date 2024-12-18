export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  namespace?: string;
}

export interface CacheProvider {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}