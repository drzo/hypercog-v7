import { writable } from 'svelte/store';
export function useNetwork() {
    const state = writable({
        online: typeof navigator !== 'undefined' ? navigator.onLine : true
    });
    if (typeof window !== 'undefined') {
        const updateOnlineStatus = () => {
            state.update(s => ({ ...s, online: navigator.onLine }));
        };
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const updateConnectionStatus = () => {
                state.update(s => ({ ...s, effectiveType: connection.effectiveType }));
            };
            connection.addEventListener('change', updateConnectionStatus);
        }
        return {
            subscribe: state.subscribe,
            destroy: () => {
                window.removeEventListener('online', updateOnlineStatus);
                window.removeEventListener('offline', updateOnlineStatus);
            }
        };
    }
    return { subscribe: state.subscribe };
}
