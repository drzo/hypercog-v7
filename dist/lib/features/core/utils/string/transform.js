/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
/**
 * Converts a string to camelCase
 */
export function camelCase(str) {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}
/**
 * Converts a string to kebab-case
 */
export function kebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}
/**
 * Converts a string to snake_case
 */
export function snakeCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toLowerCase();
}
