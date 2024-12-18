import { onMount, onDestroy } from 'svelte';
export function useIntersectionObserver(node, callback, options = {}) {
    const { once = false, ...observerOptions } = options;
    let observer;
    onMount(() => {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                callback(entry);
                if (once && entry.isIntersecting) {
                    observer.unobserve(node);
                }
            });
        }, observerOptions);
        observer.observe(node);
    });
    onDestroy(() => {
        observer?.disconnect();
    });
    return {
        destroy() {
            observer?.disconnect();
        }
    };
}
