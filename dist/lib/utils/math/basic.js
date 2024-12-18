export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
export function round(value, decimals = 0) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}
export function random(min, max) {
    return Math.random() * (max - min) + min;
}
export function randomInt(min, max) {
    return Math.floor(random(min, max + 1));
}
export function sum(numbers) {
    return numbers.reduce((acc, val) => acc + val, 0);
}
export function average(numbers) {
    return sum(numbers) / numbers.length;
}
