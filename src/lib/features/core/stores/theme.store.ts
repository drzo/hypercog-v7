import { writable } from 'svelte/store';
import type { Theme, ThemeState } from '../types/theme';
import { storageService } from '../services';
import { STORAGE_KEYS } from '../constants';

function createThemeStore() {
  const { subscribe, set } = writable<Theme>(
    storageService.get(STORAGE_KEYS.THEME) || 'system'
  );

  return {
    subscribe,
    setTheme: (theme: Theme) => {
      storageService.set(STORAGE_KEYS.THEME, theme);
      set(theme);
      updateTheme(theme);
    },
    initialize: (mediaQuery: MediaQueryList) => {
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

function updateTheme(theme: Theme) {
  const isDark = theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  document.documentElement.classList.toggle('dark', isDark);
}

export const theme = createThemeStore();