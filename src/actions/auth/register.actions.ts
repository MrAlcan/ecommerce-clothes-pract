import { defineAction, } from 'astro:actions';
import { z } from 'astro:schema';
import { RegisterDto } from '@/domain/dtos/auth/register.dto';
import { AuthDatasourcePostgresql } from '@/infrastructure/datasources/auth.datasource.postgresql'
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository.impl';
import type { UserEntity } from '@/domain/entities/user.entity';
import { Register } from '@/domain/use-cases/auth/register.use-case';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
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

    const registerDto = RegisterDto.fromObject({ name, email, password })

    const dataSource = new AuthDatasourcePostgresql();

    const repository = new AuthRepositoryImpl(dataSource);

    const userEntity: UserEntity = await new Register(repository)
      .execute(registerDto);

    return {
      user: {
        id: userEntity.id,
        email: userEntity.email,
        name: userEntity.name,
      }

    };


    // Creación de usuario



    /*try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      // Actualizar el nombre (displayName)
      updateProfile(firebase.auth.currentUser!, {
        displayName: name,
      });

      // Verificar el correo electrónico
      await sendEmailVerification(firebase.auth.currentUser!, {
        url: 'http://localhost:4321/user/profile?emailVerified=true',
      });

      return user;
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === 'auth/email-already-in-use') {
        throw new Error('El correo ya está en uso');
      }

      throw new Error('Auxilio! algo salió mal');
    }*/
  },
});