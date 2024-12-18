import type { StoreOptions, StoreState } from './store/types';
import { BaseStore } from './store/base';

export function createStore<T>(options: StoreOptions<T>) {
  return new BaseStore<T>(options);
}