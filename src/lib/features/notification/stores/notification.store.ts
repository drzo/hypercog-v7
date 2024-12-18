import { writable } from 'svelte/store';
import type { Notification, NotificationState } from '../types';

const DEFAULT_DURATION = 5000;

function createNotificationStore() {
  const { subscribe, update } = writable<NotificationState>({
    items: []
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
        items: [...state.items, newNotification]
      }));

      if (newNotification.autoClose) {
        setTimeout(() => {
          this.remove(id);
        }, newNotification.duration);
      }
    },
    remove: (id: string) => {
      update(state => ({
        items: state.items.filter(item => item.id !== id)
      }));
    },
    clear: () => {
      update(() => ({ items: [] }));
    }
  };
}

export const notificationStore = createNotificationStore();