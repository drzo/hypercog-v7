export const APP_CONFIG = {
  name: 'HyperCog',
  description: 'Self-Improving System',
  version: '0.1.0'
} as const;

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