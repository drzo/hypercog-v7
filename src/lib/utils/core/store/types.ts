export interface StoreOptions<T> {
  initialState: T;
  persist?: boolean;
  storageKey?: string;
}

export interface StoreState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}