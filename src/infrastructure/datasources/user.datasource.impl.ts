import type { UserDatasource } from "@/domain/datasources/user.datasource";
import type { GetUserDto } from "@/domain/dtos/user/get-user.dto";
import type { UserEntity } from "@/domain/entities/user.entity";
import { prisma } from "@/lib/prisma";
import { UserMapper } from "../mappers/user.mapper";

export class UserDatasourceImpl implements UserDatasource {

    async getUser(getUserDto: GetUserDto): Promise<UserEntity> {
        const { userId } = getUserDto;

        try {

            const user = await prisma.user.findFirst({
                where: {
                    id: parseInt(userId)
                }
            });

            if ( !user ) throw new Error('Usuario no Encontrado');

            const userEntity = UserMapper.userEntityFromObject(user);
            return userEntity;


        } catch ( error ) {
            console.log('Error al obtener un usuario: ', error);
            throw new Error('Error al obtener Usuario')
        }
    }

}