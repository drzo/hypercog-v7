import { writable } from 'svelte/store';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(asyncFn: () => Promise<T>) {
  const state = writable<AsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });

  async function execute(...args: any[]) {
    state.update(s => ({ ...s, loading: true }));
    
    try {
      const data = await asyncFn(...args);
      state.update(s => ({ ...s, data, loading: false, error: null }));
      return data;
    } catch (error) {
      state.update(s => ({
        ...s,
        error: error instanceof Error ? error : new Error('Unknown error'),
        loading: false
      }));
      throw error;
    }
  }

  return {
    subscribe: state.subscribe,
    execute
  };
}
