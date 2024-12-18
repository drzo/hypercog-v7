/**
 * Split array into chunks of specified size
 */
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, (index + 1) * size)
  );
}

/**
 * Flatten a nested array structure
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.reduce<T[]>((flat, item) => 
    flat.concat(Array.isArray(item) ? flatten(item) : item), 
  []);
}

/**
 * Get unique values from array
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Group array items by a key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const value = String(item[key]);
    return {
      ...groups,
      [value]: [...(groups[value] || []), item]
    };
  }, {} as Record<string, T[]>);
}