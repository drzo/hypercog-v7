import { loggerService } from '$lib/features/core/services';
export class AuthService {
    API_BASE = '/api/auth';
    async login(email, password) {
        try {
            const response = await fetch(`${this.API_BASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        }
        catch (error) {
            loggerService.error('Login failed', error);
            throw error;
        }
    }
    async logout() {
        try {
            const response = await fetch(`${this.API_BASE}/logout`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
        }
        catch (error) {
            loggerService.error('Logout failed', error);
            throw error;
        }
    }
}
export const authService = new AuthService();
