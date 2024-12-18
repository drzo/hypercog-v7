import type { StoreOptions, StoreState } from './types';
import { BaseStore } from './base';
import { logger } from '../../services/logger.service';

export class CollectionStore<T extends { id: string }> extends BaseStore<T[]> {
  async add(item: T): Promise<void> {
    this.set({ loading: true, error: null });
    
    try {
      const currentState = await this.getCurrentState();
      const newData = [...currentState.data, item];
      this.set({ data: newData, loading: false });
      logger.info('Item added to collection', { itemId: item.id });
    } catch (error) {
      this.handleError('Failed to add item', error);
      throw error;
    }
  }

  async update(id: string, updates: Partial<T>): Promise<void> {
    this.set({ loading: true, error: null });
    
    try {
      const currentState = await this.getCurrentState();
      const newData = currentState.data.map(item => 
        item.id === id ? { ...item, ...updates } : item
      );
      this.set({ data: newData, loading: false });
      logger.info('Item updated in collection', { itemId: id });
    } catch (error) {
      this.handleError('Failed to update item', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    this.set({ loading: true, error: null });
    
    try {
      const currentState = await this.getCurrentState();
      const newData = currentState.data.filter(item => item.id !== id);
      this.set({ data: newData, loading: false });
      logger.info('Item removed from collection', { itemId: id });
    } catch (error) {
      this.handleError('Failed to remove item', error);
      throw error;
    }
  }

  private async getCurrentState(): Promise<StoreState<T[]>> {
    return new Promise(resolve => {
      const unsubscribe = this.subscribe(state => {
        unsubscribe();
        resolve(state);
      });
    });
  }

  private handleError(message: string, error: unknown): void {
    logger.error(message, { error });
    this.set({
      error: error instanceof Error ? error : new Error(message),
      loading: false
    });
  }
}

export function createCollectionStore<T extends { id: string }>(
  options: StoreOptions<T[]>
) {
  return new CollectionStore<T>(options);
}