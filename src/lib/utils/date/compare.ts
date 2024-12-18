export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

export function isAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

export function isBetween(date: Date, start: Date, end: Date): boolean {
  return isAfter(date, start) && isBefore(date, end);
}

export function max(...dates: Date[]): Date {
  return new Date(Math.max(...dates.map(d => d.getTime())));
}

export function min(...dates: Date[]): Date {
  return new Date(Math.min(...dates.map(d => d.getTime())));
}