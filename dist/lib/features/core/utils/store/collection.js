import { BaseStore } from './base';
import { logger } from '../../services/logger.service';
export class CollectionStore extends BaseStore {
    async add(item) {
        this.set({ loading: true, error: null });
        try {
            const currentState = await this.getCurrentState();
            const newData = [...currentState.data, item];
            this.set({ data: newData, loading: false });
            logger.info('Item added to collection', { itemId: item.id });
        }
        catch (error) {
            this.handleError('Failed to add item', error);
            throw error;
        }
    }
    async update(id, updates) {
        this.set({ loading: true, error: null });
        try {
            const currentState = await this.getCurrentState();
            const newData = currentState.data.map(item => item.id === id ? { ...item, ...updates } : item);
            this.set({ data: newData, loading: false });
            logger.info('Item updated in collection', { itemId: id });
        }
        catch (error) {
            this.handleError('Failed to update item', error);
            throw error;
        }
    }
    async remove(id) {
        this.set({ loading: true, error: null });
        try {
            const currentState = await this.getCurrentState();
            const newData = currentState.data.filter(item => item.id !== id);
            this.set({ data: newData, loading: false });
            logger.info('Item removed from collection', { itemId: id });
        }
        catch (error) {
            this.handleError('Failed to remove item', error);
            throw error;
        }
    }
    async getCurrentState() {
        return new Promise(resolve => {
            const unsubscribe = this.subscribe(state => {
                unsubscribe();
                resolve(state);
            });
        });
    }
    handleError(message, error) {
        logger.error(message, { error });
        this.set({
            error: error instanceof Error ? error : new Error(message),
            loading: false
        });
    }
}
export function createCollectionStore(options) {
    return new CollectionStore(options);
}
