import { writable } from 'svelte/store';
function createToastStore() {
    const { subscribe, update } = writable([]);
    return {
        subscribe,
        add: (type, message) => {
            const id = Math.random().toString(36).slice(2);
            update(toasts => [...toasts, { id, type, message }]);
            setTimeout(() => {
                update(toasts => toasts.filter(t => t.id !== id));
            }, 3000);
        },
        remove: (id) => {
            update(toasts => toasts.filter(t => t.id !== id));
        }
    };
}
export const toasts = createToastStore();
