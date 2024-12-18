export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export function truncate(str, length, suffix = '...') {
    if (str.length <= length)
        return str;
    return str.slice(0, length) + suffix;
}
export function padStart(str, length, char = ' ') {
    return str.padStart(length, char);
}
export function padEnd(str, length, char = ' ') {
    return str.padEnd(length, char);
}
export function trim(str, chars) {
    if (!chars)
        return str.trim();
    const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
    return str.replace(regex, '');
}
