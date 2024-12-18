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