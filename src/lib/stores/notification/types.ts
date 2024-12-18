export type NotificationStatus = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  status: NotificationStatus;
  autoClose?: boolean;
  duration?: number;
}

export interface NotificationState {
  notifications: Notification[];
}

export interface NotificationStore {
  subscribe: (run: (value: NotificationState) => void) => () => void;
  add: (notification: Omit<Notification, 'id'>) => void;
  remove: (id: string) => void;
  clear: () => void;
}