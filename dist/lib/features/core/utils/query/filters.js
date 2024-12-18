export function createFilterState() {
    return {
        field: null,
        value: null,
        operator: 'eq'
    };
}
export function filterItems(items, filters) {
    if (!filters.length)
        return items;
    return items.filter(item => {
        return filters.every(filter => {
            if (!filter.field || !filter.value)
                return true;
            const value = item[filter.field];
            switch (filter.operator) {
                case 'eq':
                    return value === filter.value;
                case 'contains':
                    return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
                case 'gt':
                    return value > filter.value;
                case 'lt':
                    return value < filter.value;
                case 'between':
                    return Array.isArray(filter.value) &&
                        value >= filter.value[0] &&
                        value <= filter.value[1];
                default:
                    return true;
            }
        });
    });
}
