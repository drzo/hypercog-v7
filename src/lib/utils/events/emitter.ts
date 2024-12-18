import type { EventCallback, EventSubscription, EventEmitterOptions, EventMetadata } from './types';
import { logger } from '../logger/logger';

export class EventEmitter {
  private events = new Map<string, Set<EventCallback>>();
  private maxListeners: number;
  private enableWarnings: boolean;
  private eventHistory: EventMetadata[] = [];
  private readonly MAX_HISTORY = 100;

  constructor(options: EventEmitterOptions = {}) {
    this.maxListeners = options.maxListeners || 10;
    this.enableWarnings = options.enableWarnings ?? true;
  }

  on<T>(eventName: string, callback: EventCallback<T>): EventSubscription {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }

    const listeners = this.events.get(eventName)!;

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

  once<T>(eventName: string, callback: EventCallback<T>): EventSubscription {
    const subscription = this.on(eventName, (data: T) => {
      subscription.unsubscribe();
      callback(data);
    });

    return subscription;
  }

  emit<T>(eventName: string, data?: T): void {
    const listeners = this.events.get(eventName);
    
    if (listeners) {
      const metadata: EventMetadata = {
        timestamp: Date.now(),
        eventName,
        data
      };

      this.addToHistory(metadata);

      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          logger.error('Error in event listener', error, {
            eventName,
            data
          });
        }
      });
    }
  }

  removeAllListeners(eventName?: string): void {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
  }

  listenerCount(eventName: string): number {
    return this.events.get(eventName)?.size || 0;
  }

  getEventNames(): string[] {
    return Array.from(this.events.keys());
  }

  private addToHistory(metadata: EventMetadata): void {
    this.eventHistory.unshift(metadata);
    if (this.eventHistory.length > this.MAX_HISTORY) {
      this.eventHistory.pop();
    }
  }

  getEventHistory(): EventMetadata[] {
    return [...this.eventHistory];
  }
}