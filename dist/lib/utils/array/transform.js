export function chunk(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) => array.slice(index * size, (index + 1) * size));
}
export function flatten(array) {
    return array.reduce((flat, item) => flat.concat(Array.isArray(item) ? flatten(item) : item), []);
}
export function unique(array) {
    return Array.from(new Set(array));
}
export function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const value = String(item[key]);
        return {
            ...groups,
            [value]: [...(groups[value] || []), item]
        };
    }, {});
}
