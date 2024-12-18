import { writable } from 'svelte/store';
import { storageService } from '../services';
import { STORAGE_KEYS } from '../constants';
function createThemeStore() {
    const { subscribe, set } = writable(storageService.get(STORAGE_KEYS.THEME) || 'system');
    return {
        subscribe,
        setTheme: (theme) => {
            storageService.set(STORAGE_KEYS.THEME, theme);
            set(theme);
            updateTheme(theme);
        },
        initialize: (mediaQuery) => {
            const theme = storageService.get(STORAGE_KEYS.THEME) || 'system';
            updateTheme(theme);
            mediaQuery.addEventListener('change', () => {
                const currentTheme = storageService.get(STORAGE_KEYS.THEME);
                if (currentTheme === 'system') {
                    updateTheme('system');
                }
            });
        }
    };
}
function updateTheme(theme) {
    const isDark = theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
}
export const theme = createThemeStore();
