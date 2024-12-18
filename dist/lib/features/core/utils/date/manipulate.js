export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
export function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}
export function startOfDay(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}
export function endOfDay(date) {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}
