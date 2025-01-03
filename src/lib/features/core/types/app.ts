export interface AppState {
  initialized: boolean;
  error: Error | null;
}

export interface AppConfig {
  name: string;
  description: string;
  version: string;
}