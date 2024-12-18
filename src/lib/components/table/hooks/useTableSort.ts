export interface TableSortState<T> {
  sortKey: keyof T | null;
  sortDirection: 'asc' | 'desc';
}

export function sortData<T>(
  data: T[], 
  state: TableSortState<T>
): T[] {
  if (!state.sortKey) return data;
  
  return [...data].sort((a, b) => {
    const aVal = a[state.sortKey as keyof T];
    const bVal = b[state.sortKey as keyof T];
    
    if (aVal < bVal) return state.sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return state.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}