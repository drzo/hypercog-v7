import { loggerService } from '$lib/features/core/services';

export class StorageUtil {
  private readonly prefix = 'hypercog_';

  async save(key: string, data: any): Promise<void> {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(this.getKey(key), serialized);
    } catch (error) {
      loggerService.error('Failed to save data', { key, error });
      throw error;
    }
  }

  async load<T>(key: string): Promise<T | null> {
    try {
      const serialized = localStorage.getItem(this.getKey(key));
      return serialized ? JSON.parse(serialized) : null;
    } catch (error) {
      loggerService.error('Failed to load data', { key, error });
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(this.getKey(key));
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }
}

export const storage = new StorageUtil();