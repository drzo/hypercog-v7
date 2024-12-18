export function filterByValue<T>(array: T[], key: keyof T, value: any): T[] {
  return array.filter(item => item[key] === value);
}

export function filterByValues<T>(array: T[], key: keyof T, values: any[]): T[] {
  return array.filter(item => values.includes(item[key]));
}

export function filterByPredicate<T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] {
  return array.filter(predicate);
}

export function removeByValue<T>(array: T[], key: keyof T, value: any): T[] {
  return array.filter(item => item[key] !== value);
}