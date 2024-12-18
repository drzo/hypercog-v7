import { writable } from 'svelte/store';
import type { PaginatedResponse } from '../types';
import { apiClient } from './api-client';

export interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function createQuery<T>(endpoint: string) {
  const state = writable<QueryState<T>>({
    data: null,
    loading: false,
    error: null
  });

  async function fetch() {
    state.update(s => ({ ...s, loading: true }));
    
    try {
      const data = await apiClient.get<T>(endpoint);
      state.update(s => ({ ...s, data, loading: false }));
    } catch (error) {
      state.update(s => ({ 
        ...s, 
        error: error instanceof Error ? error : new Error('Unknown error'), 
        loading: false 
      }));
    }
  }

  return {
    subscribe: state.subscribe,
    fetch
  };
}

export function createPaginatedQuery<T>(endpoint: string) {
  const state = writable<QueryState<PaginatedResponse<T>>>({
    data: null,
    loading: false,
    error: null
  });

  async function fetch(page: number, pageSize: number) {
    state.update(s => ({ ...s, loading: true }));
    
    try {
      const data = await apiClient.get<PaginatedResponse<T>>(
        `${endpoint}?page=${page}&pageSize=${pageSize}`
      );
      state.update(s => ({ ...s, data, loading: false }));
    } catch (error) {
      state.update(s => ({ 
        ...s, 
        error: error instanceof Error ? error : new Error('Unknown error'),
        loading: false 
      }));
    }
  }

  return {
    subscribe: state.subscribe,
    fetch
  };
}