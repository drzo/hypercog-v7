import { eventBus } from './bus';
export function subscribe(eventName) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const subscription = eventBus.subscribe(eventName, (data) => {
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
export function publish(eventName) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const result = originalMethod.apply(this, args);
            eventBus.publish(eventName, result);
            return result;
        };
        return descriptor;
    };
}
