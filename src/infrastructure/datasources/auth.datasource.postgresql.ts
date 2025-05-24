//import { PrismaClient } from '@prisma/client';

import type { AuthDatasource } from "@/domain/datasources/auth.datasource";
import type { UserEntity } from "@/domain/entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import type { LoginDto } from "@/domain/dtos/auth/login.dto";
import type { RegisterDto } from "@/domain/dtos/auth/register.dto";
import { prisma } from "@/lib/prisma";





export class AuthDatasourcePostgresql implements AuthDatasource {

    async login(loginDto: LoginDto): Promise<UserEntity> {

        const { email, password } = loginDto

        try {
            const userLogin = await prisma.user.findFirst({
                where: {
                    email: email,
                    password: password,
                },
            });
            /*console.log('--------------------------------')
            console.log(userLogin);*/
            if ( !userLogin ) throw new Error( 'user not found' )
            
            const userEntity = UserMapper.userEntityFromObject(userLogin);
            console.log('------------ USER ENTITY DE AUTH DATASOUCE POST ----------------')
            console.log(userEntity)
            return userEntity;
        } catch (error) {
            console.log(error);
            
            throw new Error('No se pudo ingresar al usuario');
        }
    }

    async register(registerDto: RegisterDto): Promise<UserEntity> {

        const { name, email, password } = registerDto

        try {
            const userRegister = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });
            

            

            // Verificar el correo electrónico
            /*await sendEmailVerification(firebase.auth.currentUser!, {
                url: 'http://localhost:4321/user/profile?emailVerified=true',
            });*/

            const userEntity = UserMapper.userEntityFromObject(userRegister)


            return userEntity;
        } catch (error) {
            console.log(error);

            throw new Error('Auxilio! algo salió mal');
        }
    }


}