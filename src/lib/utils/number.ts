export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(undefined, options).format(num);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return formatNumber(amount, {
    style: 'currency',
    currency
  });
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function roundTo(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}