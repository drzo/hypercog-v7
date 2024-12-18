export interface AppConfig {
  name: string;
  description: string;
  version: string;
}

export interface StorageConfig {
  prefix: string;
  version: string;
}

export interface ApiConfig {
  baseURL: string;
  timeout: number;
}