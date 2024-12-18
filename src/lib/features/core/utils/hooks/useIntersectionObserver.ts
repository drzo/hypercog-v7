import { onMount, onDestroy } from 'svelte';

export interface IntersectionOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useIntersectionObserver(
  node: HTMLElement,
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionOptions = {}
) {
  const { once = false, ...observerOptions } = options;
  let observer: IntersectionObserver;

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
