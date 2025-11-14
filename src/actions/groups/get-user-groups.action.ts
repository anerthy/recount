import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const getUserGroups = defineAction({
  accept: 'json',
  input: z.object({
    userId: z.string(),
  }),
  handler: async ({ userId }) => {
    const { data, error } = await supabase
      .from('user_groups')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);

    return data;
  },
});
