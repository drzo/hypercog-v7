// Common interfaces and types used across features
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface QueryOptions {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}