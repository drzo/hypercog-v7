export type NotificationStatus = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  status: NotificationStatus;
  autoClose?: boolean;
  duration?: number;
}

export const NOTIFICATION_VARIANTS = {
  info: {
    icon: 'information-circle',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-400'
  },
  success: {
    icon: 'check-circle',
    bgColor: 'bg-green-50',
    textColor: 'text-green-400'
  },
  warning: {
    icon: 'exclamation',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-400'
  },
  error: {
    icon: 'x-circle',
    bgColor: 'bg-red-50',
    textColor: 'text-red-400'
  }
} as const;

export const NOTIFICATION_DURATION = 5000;