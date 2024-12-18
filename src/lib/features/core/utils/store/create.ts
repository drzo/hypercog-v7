import type { StoreOptions } from './types';
import { BaseStore } from './base';

export function createStore<T>(options: StoreOptions<T>) {
  return new BaseStore<T>(options);
}