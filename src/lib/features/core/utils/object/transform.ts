/**
 * Pick specific keys from object
 */
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

/**
 * Omit specific keys from object
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

/**
 * Map object values
 */
export function mapValues<T extends object, U>(
  obj: T,
  fn: (value: T[keyof T]) => U
): { [K in keyof T]: U } {
  const result = {} as { [K in keyof T]: U };
  for (const key in obj) {
    result[key] = fn(obj[key]);
  }
  return result;
}

/**
 * Map object keys
 */
export function mapKeys<T extends object, K extends string>(
  obj: T,
  fn: (key: keyof T) => K
): Record<K, T[keyof T]> {
  const result = {} as Record<K, T[keyof T]>;
  for (const key in obj) {
    result[fn(key)] = obj[key];
  }
  return result;
}