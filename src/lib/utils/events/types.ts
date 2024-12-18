export type EventCallback<T = any> = (data: T) => void;

export interface EventSubscription {
  unsubscribe: () => void;
}

export interface EventEmitterOptions {
  maxListeners?: number;
  enableWarnings?: boolean;
}

export interface EventMetadata {
  timestamp: number;
  eventName: string;
  data?: any;
}