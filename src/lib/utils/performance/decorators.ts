import { Profiler } from './profiler';

export function profile(name?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const profileName = name || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = async function (...args: any[]) {
      return await Profiler.profile(
        { name: profileName },
        () => originalMethod.apply(this, args)
      );
    };

    return descriptor;
  };
}

export function memoize(maxAge: number = Infinity) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, { value: any; timestamp: number }>();

    descriptor.value = function (...args: any[]) {
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