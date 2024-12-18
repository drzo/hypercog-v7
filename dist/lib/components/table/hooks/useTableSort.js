export function sortData(data, state) {
    if (!state.sortKey)
        return data;
    return [...data].sort((a, b) => {
        const aVal = a[state.sortKey];
        const bVal = b[state.sortKey];
        if (aVal < bVal)
            return state.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal)
            return state.sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}
