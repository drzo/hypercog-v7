export function pick(obj, keys) {
    return keys.reduce((acc, key) => {
        if (key in obj) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}
export function omit(obj, keys) {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)));
}
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(deepClone);
    }
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepClone(value)]));
}
