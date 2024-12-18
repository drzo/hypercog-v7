import { notifications } from '$lib/stores/notification';
export function useNotification() {
    function show(title, message, status = 'info', duration) {
        notifications.add({
            title,
            message,
            status,
            duration
        });
    }
    function showError(error) {
        const message = error instanceof Error ? error.message : error;
        show('Error', message, 'error');
    }
    return {
        show,
        showError
    };
}
