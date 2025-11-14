import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const createGroup = defineAction({
  accept: 'json',
  input: z.object({
    userId: z.string(),
    members: z.array(z.string()),
    name: z.string(),
    description: z.string().optional(),
    category: z.enum(['friends', 'home']),
  }),
  handler: async ({ userId, members, name, description, category }) => {
    const { data, error: errorGroup } = await supabase
      .from('groups')
      .insert([
        {
          name,
          description,
          category_id: category,
          owner_id: userId,
        },
      ])
      .select();

    if (errorGroup) {
      console.log(errorGroup);
      throw new Error(errorGroup.message);
    }

    const group = data?.[0];
    if (!group) {
      throw new Error('Group creation failed');
    }

    const memberInserts = [userId, ...members].map((memberId) => ({
      group_id: group.id,
      user_id: memberId,
      role: memberId === userId ? 'admin' : 'member',
    }));

    const { error: errorMember } = await supabase
      .from('members')
      .insert(memberInserts);

    if (errorMember) {
      console.log(errorMember);
      throw new Error(errorMember.message);
    }

    return { success: true };
  },
});
