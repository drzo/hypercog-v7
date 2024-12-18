import { writable } from 'svelte/store';
import type { NotificationState, Notification, NotificationStore } from './types';
import { DEFAULT_DURATION } from './constants';

function createNotificationStore(): NotificationStore {
  const { subscribe, update } = writable<NotificationState>({
    notifications: []
  });

  return {
    subscribe,
    add: (notification: Omit<Notification, 'id'>) => {
      const id = crypto.randomUUID();
      const newNotification = {
        ...notification,
        id,
        autoClose: notification.autoClose ?? true,
        duration: notification.duration ?? DEFAULT_DURATION
      };

      update(state => ({
        notifications: [...state.notifications, newNotification]
      }));

      if (newNotification.autoClose) {
        setTimeout(() => {
          update(state => ({
            notifications: state.notifications.filter(n => n.id !== id)
          }));
        }, newNotification.duration);
      }
    },
    remove: (id: string) => {
      update(state => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }));
    },
    clear: () => {
      update(() => ({ notifications: [] }));
    }
  };
}

export const notifications = createNotificationStore();