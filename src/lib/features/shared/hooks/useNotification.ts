import { notifications } from '$lib/stores/notification';
import type { NotificationStatus } from '$lib/types';

export function useNotification() {
  function show(
    title: string,
    message: string,
    status: NotificationStatus = 'info',
    duration?: number
  ) {
    notifications.add({
      title,
      message,
      status,
      duration
    });
  }

  function showError(error: Error | string) {
    const message = error instanceof Error ? error.message : error;
    show('Error', message, 'error');
  }

  return {
    show,
    showError
  };
}