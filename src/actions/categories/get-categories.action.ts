import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';

export const getCategories = defineAction({
  accept: 'json',
  handler: async (_) => {
    const { error, data } = await supabase
      .from('categories')
      .select('id, name')
      .eq('status', true);

    if (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
    return data;
  },
});
