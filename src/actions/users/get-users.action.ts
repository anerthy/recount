import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';

export const getUsers = defineAction({
  accept: 'json',
  handler: async (_) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('status', true);

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    return (
      data?.map(({ id, username, name, email }) => ({
        id: id,
        name: name,
        username: username,
        email: email,
      })) || []
    );
  },
});
