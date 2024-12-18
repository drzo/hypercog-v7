export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

export function paginateData<T>(
  data: T[],
  state: PaginationState
): T[] {
  const start = (state.currentPage - 1) * state.pageSize;
  const end = start + state.pageSize;
  return data.slice(start, end);
}

export function calculateTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}