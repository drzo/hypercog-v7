import { loggerService } from './logger.service';
export class Note2SelfService {
    notes = [];
    async addNote(note) {
        const newNote = {
            ...note,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString()
        };
        this.notes.push(newNote);
        loggerService.info('Added new Note2Self', { note: newNote });
        return newNote;
    }
    async getLatestNotes(limit = 10) {
        return this.notes
            .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
            .slice(0, limit);
    }
    async getGoals() {
        const latestNotes = await this.getLatestNotes();
        return latestNotes
            .flatMap(note => note.goals || [])
            .sort((a, b) => b.priority - a.priority);
    }
}
export const note2selfService = new Note2SelfService();
