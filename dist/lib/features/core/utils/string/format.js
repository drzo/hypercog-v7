/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
/**
 * Truncates a string to a specified length with optional suffix
 */
export function truncate(str, length, suffix = '...') {
    if (str.length <= length)
        return str;
    return str.slice(0, length) + suffix;
}
/**
 * Pads the start of a string with a specified character
 */
export function padStart(str, length, char = ' ') {
    return str.padStart(length, char);
}
/**
 * Pads the end of a string with a specified character
 */
export function padEnd(str, length, char = ' ') {
    return str.padEnd(length, char);
}
/**
 * Trims specified characters from both ends of a string
 */
export function trim(str, chars) {
    if (!chars)
        return str.trim();
    const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
    return str.replace(regex, '');
}
