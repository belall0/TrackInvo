import authConfig from '@/auth/auth.config';
import NextAuth from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/auth/routes';

const { auth } = NextAuth(authConfig);

// this middleware will be executed for every request
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isHomePage = nextUrl.pathname === '/';

  // if it's an auth api route defined in the routes.ts, allow it
  if (isApiAuthRoute) {
    return;
  }

  // if logged in trying to access the home page, login or signup, redirect to dashboard
  if (isLoggedIn && (isAuthRoute || isHomePage)) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin));
  }

  // if not logged in and trying to access auth route, allow it
  if (isAuthRoute) {
    return;
  }

  // // if not logged in and trying to access non-public route, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl.origin));
  }

  return;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
