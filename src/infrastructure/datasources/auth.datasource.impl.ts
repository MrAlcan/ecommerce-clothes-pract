import type { AuthDatasource } from "@/domain/datasources/auth.datasource";
import type { UserEntity } from "@/domain/entities/user.entity";
import { firebase } from '@/firebase/config';
import { signInWithEmailAndPassword, type AuthError, createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile, } from 'firebase/auth'
import { UserMapper } from "../mappers/user.mapper";
import type { LoginDto } from "@/domain/dtos/auth/login.dto";
import type { RegisterDto } from "@/domain/dtos/auth/register.dto";

export class AuthDatasourceImpl implements AuthDatasource {

    async login(loginDto: LoginDto): Promise<UserEntity> {

        const { email, password } = loginDto

        try {
            const user = await signInWithEmailAndPassword(
                firebase.auth,
                email,
                password
            );
            const userEntity = UserMapper.userEntityFromObject(user);
            return userEntity;
        } catch (error) {
            const firebaseError = error as AuthError;

            if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('El correo ya existe');
            }

            console.log(error);
            throw new Error('No se pudo ingresar al usuario');
        }
    }

    async register(registerDto: RegisterDto): Promise<UserEntity> {

        const { name, email, password } = registerDto

        try {
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

            const userEntity = UserMapper.userEntityFromObject(user)


            return userEntity;
        } catch (error) {
            const firebaseError = error as AuthError;

            if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('El correo ya está en uso');
            }

            throw new Error('Auxilio! algo salió mal');
        }
    }


}