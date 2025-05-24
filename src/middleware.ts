import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { firebase } from './firebase/config';

const privateRoutes = ['/user/profile'];
const notAuthenticatedRoutes = ['/auth/login', '/auth/register'];

export const onRequest = defineMiddleware(
  async ({ url, request, locals, redirect, cookies }, next) => {
    
    const token = cookies.get('session');
    //const token = window.localStorage.getItem('session');
    let isLoggedIn = false
    let user = null
    if (!token) {
      locals.user = null;
      isLoggedIn = false
    }else{
      isLoggedIn = true
      user = {
        photoURL: '',
        email: 'carlos@emaiol.com',
        name: 'Carlos Yujra',
        emailVerified: false
      }
    }



    /*console.log('middleware')
    console.log(user)
    console.log(url)
    console.log(request)*/

    
    //const isLoggedIn = !!firebase.auth.currentUser;
    //const user = firebase.auth.currentUser;

    locals.isLoggedIn = isLoggedIn;
    if (user) {
      locals.user = {
        avatar: user.photoURL ?? '',
        email: user.email!,
        name: user.name!,
        emailVerified: user.emailVerified ?? '',
      };
    }

    console.log({ isLoggedIn, user });
    if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
      return redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/');
    }

    return next();
  }
);