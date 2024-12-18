import { writable } from 'svelte/store';
import { DEFAULT_DURATION } from './constants';
function createNotificationStore() {
    const { subscribe, update } = writable({
        notifications: []
    });
    return {
        subscribe,
        add: (notification) => {
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
        remove: (id) => {
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
