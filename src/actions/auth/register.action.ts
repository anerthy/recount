import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const register = defineAction({
  accept: 'form',
  input: z.object({
    username: z.string().min(3),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  handler: async ({ username, name, email, password }) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { error: insertError } = await supabase
      .from('users')
      .insert([{ username, email, name }]);

    if (insertError) {
      console.error('Error inserting user data:', insertError);
      throw new Error(insertError.message);
    }

    return { success: true };
  },
});
