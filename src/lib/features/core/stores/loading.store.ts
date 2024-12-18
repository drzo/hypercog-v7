import { writable } from 'svelte/store';

function createLoadingStore() {
  const { subscribe, update } = writable<Set<string>>(new Set());

  return {
    subscribe,
    startLoading: (key: string) => update(state => {
      state.add(key);
      return state;
    }),
    stopLoading: (key: string) => update(state => {
      state.delete(key);
      return state;
    }),
    isLoading: (key: string) => {
      let loading = false;
      subscribe(state => {
        loading = state.has(key);
      })();
      return loading;
    }
  };
}

export const loading = createLoadingStore();