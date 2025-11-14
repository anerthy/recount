import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const getGroup = defineAction({
  accept: 'json',
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

    return data;
  },
});
