import { EventEmitter } from './emitter';
class EventBus {
    static instance;
    emitter;
    constructor() {
        this.emitter = new EventEmitter({
            maxListeners: 100,
            enableWarnings: true
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventBus();
        }
        return this.instance;
    }
    subscribe(eventName, callback) {
        return this.emitter.on(eventName, callback);
    }
    subscribeOnce(eventName, callback) {
        return this.emitter.once(eventName, callback);
    }
    publish(eventName, data) {
        this.emitter.emit(eventName, data);
    }
    unsubscribe(eventName) {
        this.emitter.removeAllListeners(eventName);
    }
    clear() {
        this.emitter.removeAllListeners();
    }
    getHistory() {
        return this.emitter.getEventHistory();
    }
}
export const eventBus = EventBus.getInstance();
