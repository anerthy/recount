import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const getUserProfile = defineAction({
  accept: 'json',
  input: z.object({
    id: z.string().uuid(),
  }),
  handler: async ({ id }, context) => {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (userError) {
      throw new Error(`Failed to fetch user profile: ${userError.message}`);
    }

    return userData;
  },
});
