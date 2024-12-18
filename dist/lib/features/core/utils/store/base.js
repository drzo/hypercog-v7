import { writable } from 'svelte/store';
import { storage } from '../storage';
export class BaseStore {
    store;
    options;
    constructor(options) {
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
    loadState() {
        if (this.options.persist) {
            const savedState = storage.get(this.options.storageKey);
            if (savedState)
                return savedState;
        }
        return {
            data: this.options.initialState,
            loading: false,
            error: null
        };
    }
    saveState(state) {
        if (this.options.persist) {
            storage.set(this.options.storageKey, state);
        }
    }
    subscribe(run) {
        return this.store.subscribe(run);
    }
    set(value) {
        this.store.update(state => ({ ...state, ...value }));
    }
    reset() {
        this.store.set({
            data: this.options.initialState,
            loading: false,
            error: null
        });
    }
}
