export function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}
export function isDateInRange(date, min, max) {
    return date >= min && date <= max;
}
