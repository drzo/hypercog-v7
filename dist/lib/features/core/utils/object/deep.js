/**
 * Deep clone an object
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(deepClone);
    }
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepClone(value)]));
}
/**
 * Deep equality comparison
 */
export function deepEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object')
        return false;
    if (obj1 === null || obj2 === null)
        return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length)
        return false;
    return keys1.every(key => deepEqual(obj1[key], obj2[key]));
}
/**
 * Deep merge objects
 */
export function deepMerge(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (source === undefined)
        return target;
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        });
    }
    return deepMerge(target, ...sources);
}
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
