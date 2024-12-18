export function createSortState(initialField) {
    return {
        field: initialField || null,
        direction: 'asc'
    };
}
export function sortItems(items, state) {
    if (!state.field)
        return items;
    return [...items].sort((a, b) => {
        const aVal = a[state.field];
        const bVal = b[state.field];
        if (aVal < bVal)
            return state.direction === 'asc' ? -1 : 1;
        if (aVal > bVal)
            return state.direction === 'asc' ? 1 : -1;
        return 0;
    });
}
