import type { Readable } from 'svelte/store';
import type { StoreState } from './types';
import { derived } from 'svelte/store';

export function deriveFrom<T, U>(
  store: Readable<StoreState<T>>,
  fn: (state: T) => U
): Readable<StoreState<U>> {
  return derived(store, ($state) => ({
    data: fn($state.data),
    loading: $state.loading,
    error: $state.error
  }));
}

export function filterStore<T>(
  store: Readable<StoreState<T[]>>,
  predicate: (item: T) => boolean
): Readable<StoreState<T[]>> {
  return derived(store, ($state) => ({
    data: $state.data.filter(predicate),
    loading: $state.loading,
    error: $state.error
  }));
}

export function mapStore<T, U>(
  store: Readable<StoreState<T[]>>,
  transform: (item: T) => U
): Readable<StoreState<U[]>> {
  return derived(store, ($state) => ({
    data: $state.data.map(transform),
    loading: $state.loading,
    error: $state.error
  }));
}

export function selectFromStore<T, K extends keyof T>(
  store: Readable<StoreState<T>>,
  key: K
): Readable<StoreState<T[K]>> {
  return derived(store, ($state) => ({
    data: $state.data[key],
    loading: $state.loading,
    error: $state.error
  }));
}