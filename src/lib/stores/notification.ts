import { writable } from 'svelte/store';
import type { Notification, NotificationState } from '$lib/types/notification';
import { logger } from '$lib/utils/logger';

const DEFAULT_DURATION = 5000;

function createNotificationStore() {
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

      logger.info('Notification added', { notification: newNotification });

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
      logger.info('Notification removed', { id });
    },

    clear: () => {
      update(() => ({ notifications: [] }));
      logger.info('All notifications cleared');
    }
  };
}

export const notifications = createNotificationStore();