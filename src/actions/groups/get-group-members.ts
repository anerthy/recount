import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const getGroupMembers = defineAction({
  accept: 'json',
  input: z.object({
    groupId: z.string(),
  }),
  handler: async ({ groupId }) => {
    const { data, error } = await supabase
      .from('members_with_names ')
      .select('id, user_id, group_id, username, name, email, photo_url')
      .eq('group_id', groupId);

    if (error) throw new Error(error.message);

    return data;
  },
});
