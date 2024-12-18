export interface TableSelectionState<T> {
  selectedItems: T[];
}

export function createTableSelection<T>() {
  return {
    selectItem: (state: TableSelectionState<T>, item: T, checked: boolean): T[] => {
      if (checked) {
        return [...state.selectedItems, item];
      }
      return state.selectedItems.filter(i => i !== item);
    },
    
    selectAll: (items: T[]): T[] => {
      return [...items];
    },
    
    deselectAll: (): T[] => {
      return [];
    },
    
    isSelected: (state: TableSelectionState<T>, item: T): boolean => {
      return state.selectedItems.includes(item);
    },
    
    isAllSelected: (state: TableSelectionState<T>, items: T[]): boolean => {
      return items.length > 0 && items.every(item => state.selectedItems.includes(item));
    }
  };
}