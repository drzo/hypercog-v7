export function useMediaQuery(query) {
    let mediaQuery;
    let matches = false;
    if (typeof window !== 'undefined') {
        mediaQuery = window.matchMedia(query);
        matches = mediaQuery.matches;
    }
    return {
        matches,
        subscribe(callback) {
            const handler = (e) => callback(e.matches);
            mediaQuery?.addEventListener('change', handler);
            return () => mediaQuery?.removeEventListener('change', handler);
        }
    };
}
