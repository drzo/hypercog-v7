import { onMount, onDestroy } from 'svelte';
export function useEventListener(eventName, handler, element = window, options) {
    onMount(() => {
        element.addEventListener(eventName, handler, options);
    });
    onDestroy(() => {
        element.removeEventListener(eventName, handler, options);
    });
}
