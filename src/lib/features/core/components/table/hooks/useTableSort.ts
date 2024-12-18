import type { TableState } from '$lib/types/table';

export function sortData<T>(data: T[], state: TableState<T>): T[] {
  if (!state.sortKey) return data;
  
  return [...data].sort((a, b) => {
    const aVal = a[state.sortKey as keyof T];
    const bVal = b[state.sortKey as keyof T];
    
    if (aVal < bVal) return state.sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return state.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}