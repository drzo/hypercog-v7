// Split pagination logic into its own module
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export function calculateTotalPages(total: number, pageSize: number): number {
  return Math.ceil(total / pageSize);
}

export function getPageItems<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return items.slice(start, end);
}

export function createPaginationState(initialPage = 1, initialPageSize = 10): PaginationState {
  return {
    page: initialPage,
    pageSize: initialPageSize,
    total: 0
  };
}