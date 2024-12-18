import { Profiler } from './profiler';
export function profile(name) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const profileName = name || `${target.constructor.name}.${propertyKey}`;
        descriptor.value = async function (...args) {
            return await Profiler.profile({ name: profileName }, () => originalMethod.apply(this, args));
        };
        return descriptor;
    };
}
export function memoize(maxAge = Infinity) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const cache = new Map();
        descriptor.value = function (...args) {
            const key = JSON.stringify(args);
            const cached = cache.get(key);
            if (cached && Date.now() - cached.timestamp < maxAge) {
                return cached.value;
            }
            const result = originalMethod.apply(this, args);
            cache.set(key, { value: result, timestamp: Date.now() });
            return result;
        };
        return descriptor;
    };
}
