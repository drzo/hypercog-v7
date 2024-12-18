export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, K>);
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
  ) as T;
}