import { onMount, onDestroy } from 'svelte';

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement = window,
  options?: boolean | AddEventListenerOptions
) {
  onMount(() => {
    element.addEventListener(eventName, handler as EventListener, options);
  });

  onDestroy(() => {
    element.removeEventListener(eventName, handler as EventListener, options);
  });
}
