import { writable } from 'svelte/store';
import type { AppState } from '../types';

const initialState: AppState = {
  initialized: false,
  error: null
};

function createAppStore() {
  const { subscribe, update, set } = writable<AppState>(initialState);

  return {
    subscribe,
    initialize: () => update(state => ({ ...state, initialized: true })),
    setError: (error: Error | null) => update(state => ({ ...state, error })),
    reset: () => set(initialState)
  };
}

export const app = createAppStore();