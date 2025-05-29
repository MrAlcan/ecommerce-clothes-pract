import { firebase } from '@/firebase/config';
import { defineAction,  } from 'astro:actions';
import { z } from 'astro:schema';
import { signOut } from 'firebase/auth';


export const logout = defineAction({
  accept: 'json',
  handler: async (_, { cookies }) => {
    //return await signOut(firebase.auth);
    cookies.set('session', '', {
      httpOnly: true,
      //sameSite: 'lax',
      path: '/',
      expires: new Date(0),
      //maxAge: 60 * 60 * 24 * 1,
      //secure: import.meta.env.PROD,
    });

    return 200
  },
});