import type { StoreState } from './types';
import { BaseStore } from './base';

export class AsyncStore<T> extends BaseStore<T> {
  async load(loadFn: () => Promise<T>): Promise<void> {
    this.set({ loading: true, error: null });
    
    try {
      const data = await loadFn();
      this.set({ data, loading: false });
    } catch (error) {
      this.set({ 
        error: error instanceof Error ? error : new Error('Unknown error'),
        loading: false 
      });
      throw error;
    }
  }

  async update(updateFn: (current: T) => Promise<T>): Promise<void> {
    this.set({ loading: true, error: null });
    
    try {
      const currentState = await this.getCurrentState();
      const updatedData = await updateFn(currentState.data);
      this.set({ data: updatedData, loading: false });
    } catch (error) {
      this.set({
        error: error instanceof Error ? error : new Error('Unknown error'),
        loading: false
      });
      throw error;
    }
  }

  private getCurrentState(): Promise<StoreState<T>> {
    return new Promise(resolve => {
      const unsubscribe = this.subscribe(state => {
        unsubscribe();
        resolve(state);
      });
    });
  }
}

export function createAsyncStore<T>(options: { initialState: T; persist?: boolean; storageKey?: string }) {
  return new AsyncStore(options);
}