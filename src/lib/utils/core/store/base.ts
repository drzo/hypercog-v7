import { writable, type Writable } from 'svelte/store';
import type { StoreOptions, StoreState } from './types';
import { storageCache } from '../cache/storage';

export class BaseStore<T> {
  protected store: Writable<StoreState<T>>;
  protected options: StoreOptions<T>;

  constructor(options: StoreOptions<T>) {
    this.options = {
      persist: false,
      storageKey: 'store',
      ...options
    };

    const initialState = this.loadState();
    this.store = writable(initialState);

    if (this.options.persist) {
      this.store.subscribe(state => this.saveState(state));
    }
  }

  protected loadState(): StoreState<T> {
    if (this.options.persist) {
      const savedState = storageCache.get<StoreState<T>>(this.options.storageKey);
      if (savedState) return savedState;
    }

    return {
      data: this.options.initialState,
      loading: false,
      error: null
    };
  }

  protected saveState(state: StoreState<T>): void {
    if (this.options.persist) {
      storageCache.set(this.options.storageKey, state);
    }
  }

  subscribe(run: (value: StoreState<T>) => void) {
    return this.store.subscribe(run);
  }

  reset(): void {
    this.store.set({
      data: this.options.initialState,
      loading: false,
      error: null
    });
  }
}