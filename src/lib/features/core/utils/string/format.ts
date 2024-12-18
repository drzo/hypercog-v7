/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncates a string to a specified length with optional suffix
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

/**
 * Pads the start of a string with a specified character
 */
export function padStart(str: string, length: number, char: string = ' '): string {
  return str.padStart(length, char);
}

/**
 * Pads the end of a string with a specified character
 */
export function padEnd(str: string, length: number, char: string = ' '): string {
  return str.padEnd(length, char);
}

/**
 * Trims specified characters from both ends of a string
 */
export function trim(str: string, chars?: string): string {
  if (!chars) return str.trim();
  const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
  return str.replace(regex, '');
}