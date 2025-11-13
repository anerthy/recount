import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const signIn = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  handler: async ({ email, password }, { cookies, rewrite }) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    const { access_token, refresh_token } = data.session;
    cookies.set('sb-access-token', access_token, {
      path: '/',
    });
    cookies.set('sb-refresh-token', refresh_token, {
      path: '/',
    });

    return { success: true };
  },
});
