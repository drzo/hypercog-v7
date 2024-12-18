export function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const value = String(item[key]);
        return {
            ...groups,
            [value]: [...(groups[value] || []), item]
        };
    }, {});
}
export function unique(array) {
    return Array.from(new Set(array));
}
export function chunk(array, size) {
    return array.reduce((chunks, item, index) => {
        const chunkIndex = Math.floor(index / size);
        if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(item);
        return chunks;
    }, []);
}
