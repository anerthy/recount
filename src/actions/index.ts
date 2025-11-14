import { register, signOut } from './auth';
import { signIn } from './auth/sign-in.action';
import { getCategories } from './categories/get-categories.action';
import { createGroup } from './groups/create-group.action';
import { getGroupMembers } from './groups/get-group-members';
import { getGroup } from './groups/get-group.action';
import { getUserGroups } from './groups/get-user-groups.action';
import { getUsers } from './users/get-users.action';

export const server = {
  register,
  signIn,
  signOut,
  getGroup,
  getUserGroups,
  createGroup,
  getUsers,
  getCategories,
  getGroupMembers,
};
