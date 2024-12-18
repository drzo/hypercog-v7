import { writable } from 'svelte/store';

export interface NetworkState {
  online: boolean;
  effectiveType?: string;
}

export function useNetwork() {
  const state = writable<NetworkState>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true
  });

  if (typeof window !== 'undefined') {
    const updateOnlineStatus = () => {
      state.update(s => ({ ...s, online: navigator.onLine }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
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
