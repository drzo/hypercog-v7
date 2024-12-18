import type { TableState } from '$lib/types/table';

export function createTableSelection() {
  return {
    selectItem<T>(state: TableState<T>, item: T, checked: boolean): T[] {
      if (checked) {
        return [...state.selectedItems, item];
      }
      return state.selectedItems.filter(i => i !== item);
    },
    
    selectAll<T>(items: T[]): T[] {
      return [...items];
    },
    
    deselectAll(): any[] {
      return [];
    },
    
    isSelected<T>(state: TableState<T>, item: T): boolean {
      return state.selectedItems.includes(item);
    },
    
    isAllSelected<T>(state: TableState<T>, items: T[]): boolean {
      return items.length > 0 && items.every(item => state.selectedItems.includes(item));
    }
  };
}