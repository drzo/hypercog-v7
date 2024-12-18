import type { Readable } from 'svelte/store';

export interface StoreOptions<T> {
  initialState: T;
  persist?: boolean;
  storageKey?: string;
  onError?: (error: Error) => void;
}

export interface StoreState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

export interface Store<T> extends Readable<StoreState<T>> {
  set(value: Partial<StoreState<T>>): void;
  reset(): void;
}

export interface AsyncStore<T> extends Store<T> {
  load(loadFn: () => Promise<T>): Promise<void>;
  update(updateFn: (current: T) => Promise<T>): Promise<void>;
}

export interface CollectionStore<T extends { id: string }> extends Store<T[]> {
  add(item: T): Promise<void>;
  update(id: string, updates: Partial<T>): Promise<void>;
  remove(id: string): Promise<void>;
}