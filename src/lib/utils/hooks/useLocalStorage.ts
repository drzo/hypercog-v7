import { writable } from 'svelte/store';
import { storage } from '../storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = storage.get<T>(key) ?? initialValue;
  const store = writable<T>(storedValue);
  
  store.subscribe(value => {
    storage.set(key, value);
  });

  return store;
}