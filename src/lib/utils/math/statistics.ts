export function median(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
}

export function mode(numbers: number[]): number[] {
  const counts = new Map<number, number>();
  let maxCount = 0;
  
  numbers.forEach(num => {
    const count = (counts.get(num) || 0) + 1;
    counts.set(num, count);
    maxCount = Math.max(maxCount, count);
  });
  
  return Array.from(counts.entries())
    .filter(([_, count]) => count === maxCount)
    .map(([num]) => num);
}

export function variance(numbers: number[]): number {
  const avg = average(numbers);
  return average(numbers.map(num => Math.pow(num - avg, 2)));
}

export function standardDeviation(numbers: number[]): number {
  return Math.sqrt(variance(numbers));
}

function average(numbers: number[]): number {
  return numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
}