/**
 * These routes do not require authentication
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect the logged in users to DEFAULT_LOGIN_REDIRECT
 */
export const authRoutes = ['/auth/login', '/auth/signup'];

/**
 * The prefix for the authentication routes
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after log in
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
