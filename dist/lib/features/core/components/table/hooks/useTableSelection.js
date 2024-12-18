export function createTableSelection() {
    return {
        selectItem(state, item, checked) {
            if (checked) {
                return [...state.selectedItems, item];
            }
            return state.selectedItems.filter(i => i !== item);
        },
        selectAll(items) {
            return [...items];
        },
        deselectAll() {
            return [];
        },
        isSelected(state, item) {
            return state.selectedItems.includes(item);
        },
        isAllSelected(state, items) {
            return items.length > 0 && items.every(item => state.selectedItems.includes(item));
        }
    };
}
