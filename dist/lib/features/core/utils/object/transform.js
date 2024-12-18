/**
 * Pick specific keys from object
 */
export function pick(obj, keys) {
    return keys.reduce((acc, key) => {
        if (key in obj) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}
/**
 * Omit specific keys from object
 */
export function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}
/**
 * Map object values
 */
export function mapValues(obj, fn) {
    const result = {};
    for (const key in obj) {
        result[key] = fn(obj[key]);
    }
    return result;
}
/**
 * Map object keys
 */
export function mapKeys(obj, fn) {
    const result = {};
    for (const key in obj) {
        result[fn(key)] = obj[key];
    }
    return result;
}
