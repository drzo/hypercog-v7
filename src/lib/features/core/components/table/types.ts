export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (item: T) => string | number | boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  pageSize?: number;
  selectable?: boolean;
  onRowSelect?: (selectedItems: T[]) => void;
}

export interface TableState<T> {
  currentPage: number;
  sortKey: keyof T | null;
  sortDirection: 'asc' | 'desc';
  selectedItems: T[];
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}