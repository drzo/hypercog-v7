export function isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
export function isBefore(date1, date2) {
    return date1.getTime() < date2.getTime();
}
export function isAfter(date1, date2) {
    return date1.getTime() > date2.getTime();
}
export function isBetween(date, start, end) {
    return isAfter(date, start) && isBefore(date, end);
}
export function max(...dates) {
    return new Date(Math.max(...dates.map(d => d.getTime())));
}
export function min(...dates) {
    return new Date(Math.min(...dates.map(d => d.getTime())));
}
