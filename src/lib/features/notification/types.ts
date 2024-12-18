export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  autoClose?: boolean;
  duration?: number;
}

export interface NotificationState {
  items: Notification[];
}