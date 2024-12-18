import { writable } from 'svelte/store';
import type { User } from '../types/user';
import { authService } from '../services/auth.service';
import { loggerService } from '$lib/features/core/services';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    loading: false,
    error: null
  });

  return {
    subscribe,
    login: async (email: string, password: string) => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const user = await authService.login(email, password);
        update(state => ({ ...state, user, loading: false }));
      } catch (error) {
        loggerService.error('Login failed', error);
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : 'Login failed'
        }));
      }
    },
    logout: async () => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        await authService.logout();
        set({ user: null, loading: false, error: null });
      } catch (error) {
        loggerService.error('Logout failed', error);
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : 'Logout failed'
        }));
      }
    }
  };
}

export const auth = createAuthStore();