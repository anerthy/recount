import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabase';

const PUBLIC_ROUTES = ['/', '/signin', '/register'];

export const onRequest = defineMiddleware(
  async ({ cookies, redirect, url, locals }, next) => {
    return next(); // Temporary bypass for middleware

    // TODO: getSession from cookies and validate with Supabase

    if (PUBLIC_ROUTES.includes(url.pathname)) {
      return next();
    }

    const accessToken = cookies.get('sb-access-token');
    const refreshToken = cookies.get('sb-refresh-token');

    if (!accessToken || !refreshToken) {
      console.log('no tiene cookies');
      return redirect('/signin');
    }

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
      });

      if (error || !session) {
        console.log('token inválido');
        cookies.delete('sb-access-token', { path: '/' });
        cookies.delete('sb-refresh-token', { path: '/' });
        return redirect('/signin');
      }

      locals.user = session.user;
      locals.isLoggedIn = true;

      return next();
    } catch (err) {
      console.error('Error en middleware:', err);
      cookies.delete('sb-access-token', { path: '/' });
      cookies.delete('sb-refresh-token', { path: '/' });
      return redirect('/signin');
    }
  }
);
