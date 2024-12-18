import { logger } from '../logger/logger';
export class EventEmitter {
    events = new Map();
    maxListeners;
    enableWarnings;
    eventHistory = [];
    MAX_HISTORY = 100;
    constructor(options = {}) {
        this.maxListeners = options.maxListeners || 10;
        this.enableWarnings = options.enableWarnings ?? true;
    }
    on(eventName, callback) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, new Set());
        }
        const listeners = this.events.get(eventName);
        if (this.enableWarnings && listeners.size >= this.maxListeners) {
            logger.warn('Max listeners exceeded for event', {
                eventName,
                currentCount: listeners.size,
                maxListeners: this.maxListeners
            });
        }
        listeners.add(callback);
        return {
            unsubscribe: () => {
                listeners.delete(callback);
                if (listeners.size === 0) {
                    this.events.delete(eventName);
                }
            }
        };
    }
    once(eventName, callback) {
        const subscription = this.on(eventName, (data) => {
            subscription.unsubscribe();
            callback(data);
        });
        return subscription;
    }
    emit(eventName, data) {
        const listeners = this.events.get(eventName);
        if (listeners) {
            const metadata = {
                timestamp: Date.now(),
                eventName,
                data
            };
            this.addToHistory(metadata);
            listeners.forEach(callback => {
                try {
                    callback(data);
                }
                catch (error) {
                    logger.error('Error in event listener', error, {
                        eventName,
                        data
                    });
                }
            });
        }
    }
    removeAllListeners(eventName) {
        if (eventName) {
            this.events.delete(eventName);
        }
        else {
            this.events.clear();
        }
    }
    listenerCount(eventName) {
        return this.events.get(eventName)?.size || 0;
    }
    getEventNames() {
        return Array.from(this.events.keys());
    }
    addToHistory(metadata) {
        this.eventHistory.unshift(metadata);
        if (this.eventHistory.length > this.MAX_HISTORY) {
            this.eventHistory.pop();
        }
    }
    getEventHistory() {
        return [...this.eventHistory];
    }
}
