export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function round(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max + 1));
}

export function sum(numbers: number[]): number {
  return numbers.reduce((acc, val) => acc + val, 0);
}

export function average(numbers: number[]): number {
  return sum(numbers) / numbers.length;
}