import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  return {
    subscribe,
    add: (type: ToastType, message: string) => {
      const id = Math.random().toString(36).slice(2);
      update(toasts => [...toasts, { id, type, message }]);
      setTimeout(() => {
        update(toasts => toasts.filter(t => t.id !== id));
      }, 3000);
    },
    remove: (id: string) => {
      update(toasts => toasts.filter(t => t.id !== id));
    }
  };
}

export const toasts = createToastStore();