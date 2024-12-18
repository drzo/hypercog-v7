// Core types used across features
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

export interface ApiOptions {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
}