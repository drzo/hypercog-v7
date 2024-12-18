import { writable } from 'svelte/store';
import { storage } from '../storage';
export function useLocalStorage(key, initialValue) {
    const storedValue = storage.get(key) ?? initialValue;
    const store = writable(storedValue);
    store.subscribe(value => {
        storage.set(key, value);
    });
    return store;
}
