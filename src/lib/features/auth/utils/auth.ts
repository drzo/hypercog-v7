import type { User } from '../types/user';

export function isAuthenticated(user: User | null): boolean {
  return user !== null;
}

export function hasRole(user: User | null, role: string): boolean {
  return user?.role === role;
}

export function getInitials(user: User | null): string {
  if (!user?.name) return '';
  return user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
}