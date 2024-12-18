import { EventEmitter } from './emitter';
import type { EventCallback, EventSubscription } from './types';

class EventBus {
  private static instance: EventBus;
  private emitter: EventEmitter;

  private constructor() {
    this.emitter = new EventEmitter({
      maxListeners: 100,
      enableWarnings: true
    });
  }

  static getInstance(): EventBus {
    if (!this.instance) {
      this.instance = new EventBus();
    }
    return this.instance;
  }

  subscribe<T>(eventName: string, callback: EventCallback<T>): EventSubscription {
    return this.emitter.on(eventName, callback);
  }

  subscribeOnce<T>(eventName: string, callback: EventCallback<T>): EventSubscription {
    return this.emitter.once(eventName, callback);
  }

  publish<T>(eventName: string, data?: T): void {
    this.emitter.emit(eventName, data);
  }

  unsubscribe(eventName: string): void {
    this.emitter.removeAllListeners(eventName);
  }

  clear(): void {
    this.emitter.removeAllListeners();
  }

  getHistory() {
    return this.emitter.getEventHistory();
  }
}

export const eventBus = EventBus.getInstance();