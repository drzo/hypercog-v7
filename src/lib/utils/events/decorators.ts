import { eventBus } from './bus';
import type { EventCallback } from './types';

export function subscribe(eventName: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const subscription = eventBus.subscribe(eventName, (data: any) => {
        originalMethod.call(this, data, ...args);
      });

      // Store subscription for cleanup
      if (!this.__eventSubscriptions) {
        this.__eventSubscriptions = [];
      }
      this.__eventSubscriptions.push(subscription);

      return subscription;
    };

    return descriptor;
  };
}

export function publish(eventName: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      eventBus.publish(eventName, result);
      return result;
    };

    return descriptor;
  };
}