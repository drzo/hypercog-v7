import { writable } from 'svelte/store';

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize() {
  const { subscribe, set } = writable<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  if (typeof window !== 'undefined') {
    const handleResize = () => {
      set({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return {
      subscribe,
      destroy: () => {
        window.removeEventListener('resize', handleResize);
      }
    };
  }

  return { subscribe };
}
