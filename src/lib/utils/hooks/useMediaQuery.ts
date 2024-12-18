export function useMediaQuery(query: string) {
  let mediaQuery: MediaQueryList;
  let matches = false;

  if (typeof window !== 'undefined') {
    mediaQuery = window.matchMedia(query);
    matches = mediaQuery.matches;
  }

  return {
    matches,
    subscribe(callback: (matches: boolean) => void) {
      const handler = (e: MediaQueryListEvent) => callback(e.matches);
      mediaQuery?.addEventListener('change', handler);
      return () => mediaQuery?.removeEventListener('change', handler);
    }
  };
}