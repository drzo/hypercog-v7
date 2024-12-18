// Split sorting logic into its own module
export interface SortState {
  field: string | null;
  direction: 'asc' | 'desc';
}

export function createSortState(initialField?: string): SortState {
  return {
    field: initialField || null,
    direction: 'asc'
  };
}

export function sortItems<T>(items: T[], state: SortState): T[] {
  if (!state.field) return items;
  
  return [...items].sort((a, b) => {
    const aVal = a[state.field as keyof T];
    const bVal = b[state.field as keyof T];
    
    if (aVal < bVal) return state.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return state.direction === 'asc' ? 1 : -1;
    return 0;
  });
}