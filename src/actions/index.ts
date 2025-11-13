import { register, signOut } from './auth';
import { signIn } from './auth/sign-in.action';

export const server = {
  register,
  signIn,
  signOut,
};
