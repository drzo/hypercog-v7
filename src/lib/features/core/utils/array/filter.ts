/**
 * Filter array by a specific key-value pair
 */
export function filterByValue<T>(array: T[], key: keyof T, value: any): T[] {
  return array.filter(item => item[key] === value);
}

/**
 * Filter array by multiple possible values for a key
 */
export function filterByValues<T>(array: T[], key: keyof T, values: any[]): T[] {
  return array.filter(item => values.includes(item[key]));
}

/**
 * Filter array using a predicate function
 */
export function filterByPredicate<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}

/**
 * Remove items from array by value
 */
export function removeByValue<T>(array: T[], key: keyof T, value: any): T[] {
  return array.filter(item => item[key] !== value);
}