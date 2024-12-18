// Core feature exports with improved organization
export * from './core';
export * from './auth';
export * from './settings';
export * from './shared';
export * from './user';
export * from './notification';

// Re-export commonly used types and utilities
export type { User } from './auth/types';
export type { NotificationType } from './notification/types';
export { createQuery, createPaginatedQuery } from './core/utils/api';
export { required, email, minLength, maxLength } from './core/utils/validation';