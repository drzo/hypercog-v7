export function formatNumber(num, options) {
    return new Intl.NumberFormat(undefined, options).format(num);
}
export function formatCurrency(amount, currency = 'USD') {
    return formatNumber(amount, {
        style: 'currency',
        currency
    });
}
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
export function roundTo(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
}
