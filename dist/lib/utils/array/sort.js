export function sortBy(array, key, order = 'asc') {
    return [...array].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal < bVal)
            return order === 'asc' ? -1 : 1;
        if (aVal > bVal)
            return order === 'asc' ? 1 : -1;
        return 0;
    });
}
export function sortByMultiple(array, ...criteria) {
    return [...array].sort((a, b) => {
        for (const { key, order = 'asc' } of criteria) {
            if (a[key] < b[key])
                return order === 'asc' ? -1 : 1;
            if (a[key] > b[key])
                return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
}
