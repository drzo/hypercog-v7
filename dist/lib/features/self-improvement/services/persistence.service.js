import { storage } from '../utils/storage';
import { loggerService } from '$lib/features/core/services';
export class PersistenceService {
    KEYS = {
        STATE_HISTORY: 'state_history',
        NOTES: 'notes'
    };
    async saveState(state) {
        try {
            const history = await this.getStateHistory();
            history.push(state);
            // Keep only last 100 states
            if (history.length > 100) {
                history.shift();
            }
            await storage.save(this.KEYS.STATE_HISTORY, history);
            loggerService.info('Saved system state');
        }
        catch (error) {
            loggerService.error('Failed to save state', error);
            throw error;
        }
    }
    async getStateHistory() {
        return await storage.load(this.KEYS.STATE_HISTORY) || [];
    }
    async getLatestState() {
        const history = await this.getStateHistory();
        return history.length > 0 ? history[history.length - 1] : null;
    }
    async saveNote(note) {
        try {
            const notes = await this.getNotes();
            notes.push(note);
            await storage.save(this.KEYS.NOTES, notes);
            loggerService.info('Saved note', { noteId: note.id });
        }
        catch (error) {
            loggerService.error('Failed to save note', error);
            throw error;
        }
    }
    async getNotes() {
        return await storage.load(this.KEYS.NOTES) || [];
    }
}
export const persistenceService = new PersistenceService();