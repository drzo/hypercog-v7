import { BaseStore } from './base';
export class AsyncStore extends BaseStore {
    async load(loadFn) {
        this.set({ loading: true, error: null });
        try {
            const data = await loadFn();
            this.set({ data, loading: false });
        }
        catch (error) {
            this.set({
                error: error instanceof Error ? error : new Error('Unknown error'),
                loading: false
            });
            throw error;
        }
    }
    async update(updateFn) {
        this.set({ loading: true, error: null });
        try {
            const currentState = await this.getCurrentState();
            const updatedData = await updateFn(currentState.data);
            this.set({ data: updatedData, loading: false });
        }
        catch (error) {
            this.set({
                error: error instanceof Error ? error : new Error('Unknown error'),
                loading: false
            });
            throw error;
        }
    }
    getCurrentState() {
        return new Promise(resolve => {
            const unsubscribe = this.subscribe(state => {
                unsubscribe();
                resolve(state);
            });
        });
    }
}
export function createAsyncStore(options) {
    return new AsyncStore(options);
}
