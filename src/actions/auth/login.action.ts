import { LoginDto } from '@/domain/dtos/auth/login.dto';
import type { UserEntity } from '@/domain/entities/user.entity';
import { Login } from '@/domain/use-cases/auth/login.use-case';
import { firebase } from '@/firebase/config';
import { AuthDatasourceImpl } from '@/infrastructure/datasources/auth.datasource.impl';
import { AuthDatasourcePostgresql } from '@/infrastructure/datasources/auth.datasource.postgresql';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository.impl';
import { defineAction, } from 'astro:actions';
import { z } from 'astro:schema';

import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';

//import jwt, { sign, type SignOptions } from 'jsonwebtoken';
import pkg from 'jsonwebtoken';
const {sign} = pkg;
import { serialize } from 'cookie';
import { getSecret } from 'astro:env/server'



export const loginUser = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ email, password, remember_me }, { cookies }) => {



        // Cookies
        if (remember_me) {
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año,
                path: '/',
            });
        } else {
            cookies.delete('email', {
                path: '/',
            });
        }

        const loginDto = LoginDto.fromObject({ email, password })

        const datasource = new AuthDatasourcePostgresql()

        const repository = new AuthRepositoryImpl(datasource)

        const userEntity: UserEntity = await new Login(repository).execute(loginDto)

        console.log('------------ USER ENTITY DE ACTION LOGIN ----------------')
        console.log(userEntity)
        
        if(userEntity){
            console.log('------------ USER ENTITY DE ACTION LOGIN ----------------')
            console.log(userEntity)


        const JWT_SECRET: string = import.meta.env.JWT_SECRET_KEY;


        const token = sign({ userId: userEntity.id }, JWT_SECRET, { expiresIn: '1h' });
        //cookies.set('session', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 1 });


        /*const token = cookies.get('session');
        const data = verify(token, JWT_SECRET);*/

        /*const payload = {
            
        }

        const duration: string = '1h'

        const options: SignOptions = {
            expiresIn: duration,
        } as SignOptions

        const token = jwt.sign(
          payload,
          JWT_SECRET,
          options,
          ( err, token ) => {
            if ( err ) return ( null )
            return ( token! )
          },
        )*/

/*export class JwtAdapter {
  static async generateToken (
    payload: object,
    duration: string = '2h',
  ): Promise<string | null> {
    const options: SignOptions = {
      expiresIn: duration,
    } as SignOptions
    return new Promise( ( resolve ) => {
      jwt.sign(
        payload,
        JWT_SECRET,
        options,
        ( err, token ) => {
          if ( err ) return resolve( null )
          return resolve( token! )
        },
      )
    } )
  }

  static validateToken<T> ( token: string ): Promise<T | null> {
    return new Promise( ( resolve ) => {
      jwt.verify( token, JWT_SECRET, ( err, decoded ) => {
        if ( err ) return resolve( null )
        return resolve( decoded as T )
      } )
    } )
  }
}*/
            /*const token = sign({
                userId: userEntity.id,
                userName: userEntity.name,
             }, Deno.env.get('JWT_SECRET')!, { expiresIn: '1d' });*/
           
            cookies.set('session', token, {
              httpOnly: true,
              //sameSite: 'lax',
              path: '/',
              maxAge: 60 * 60 * 24 * 1,
              //secure: import.meta.env.PROD,
            });
        }

        return {
            user: {
              id: userEntity.id,
              email: userEntity.email,
              name: userEntity.name,
            }
      
          };

        //return userEntity

        




        

        /*try {
            const user = await signInWithEmailAndPassword(
                firebase.auth,
                email,
                password
            );

            return user;
        } catch (error) {
            const firebaseError = error as AuthError;

            if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('El correo ya existe');
            }

            console.log(error);
            throw new Error('No se pudo ingresar al usuario');
        }*/
    },
});