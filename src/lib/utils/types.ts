// Core type definitions
export type ValidationRule = (value: any) => string | null;

export type NotificationStatus = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  status: NotificationStatus;
  autoClose?: boolean;
  duration?: number;
}