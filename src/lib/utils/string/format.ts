export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

export function padStart(str: string, length: number, char: string = ' '): string {
  return str.padStart(length, char);
}

export function padEnd(str: string, length: number, char: string = ' '): string {
  return str.padEnd(length, char);
}

export function trim(str: string, chars?: string): string {
  if (!chars) return str.trim();
  const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
  return str.replace(regex, '');
}