import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { firebase } from './firebase/config';

const privateRoutes = ['/user/profile'];
const notAuthenticatedRoutes = ['/auth/login', '/auth/register'];
import jwt from "jsonwebtoken";
import { GetUserDto } from './domain/dtos/user/get-user.dto';
import { UserDatasourceImpl } from './infrastructure/datasources/user.datasource.impl';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { GetUser } from './domain/use-cases/user/get-user.use-case';
import type { UserEntity } from './domain/entities/user.entity';

export const onRequest = defineMiddleware(
  async ({ url, request, locals, redirect, cookies }, next) => {

    const token = cookies.get('session')?.value;
    console.log(token)
    
    //const token = window.localStorage.getItem('session');
    let isLoggedIn = false
    let user = null
    if (!token) {
      locals.user = null;
      isLoggedIn = false
    }else{
      const JWT_SECRET: string = import.meta.env.JWT_SECRET_KEY;
      try {
        const decoded = jwt.verify(token.toString(), JWT_SECRET);
        console.log("Token válido:", decoded);
        
        const userId = (decoded as any).userId;

        const getUserDto = GetUserDto.fromObject({ userId });
        const datasource = new UserDatasourceImpl();
        const repository = new UserRepositoryImpl(datasource);
        const userEntity: UserEntity = await new GetUser(repository).execute(getUserDto);


        isLoggedIn = true
        user = {
          photoURL: '',
          email: userEntity.email,
          name: userEntity.name,
          emailVerified: false
        }
      } catch (error) {
        isLoggedIn = false
        console.error("Token inválido o expirado:", error);
        cookies.set('session', '', {
          httpOnly: true,
          //sameSite: 'lax',
          path: '/',
          expires: new Date(0),
          //maxAge: 60 * 60 * 24 * 1,
          //secure: import.meta.env.PROD,
        });
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