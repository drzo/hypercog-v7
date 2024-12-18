export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function isDateInRange(date: Date, min: Date, max: Date): boolean {
  return date >= min && date <= max;
}