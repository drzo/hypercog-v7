import { writable, type Writable } from 'svelte/store';

export interface StoreState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function createStore<T>(initialData: T | null = null) {
  const { subscribe, set, update }: Writable<StoreState<T>> = writable({
    data: initialData,
    loading: false,
    error: null
  });

  return {
    subscribe,
    setData: (data: T) => update(state => ({ ...state, data })),
    setLoading: (loading: boolean) => update(state => ({ ...state, loading })),
    setError: (error: Error | null) => update(state => ({ ...state, error })),
    reset: () => set({ data: initialData, loading: false, error: null })
  };
}