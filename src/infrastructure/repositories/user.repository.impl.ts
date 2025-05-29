import type { UserDatasource } from "@/domain/datasources/user.datasource";
import type { GetUserDto } from "@/domain/dtos/user/get-user.dto";
import type { UserEntity } from "@/domain/entities/user.entity";
import type { UserRepository } from "@/domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {
    
    constructor (
        private readonly userDatasource: UserDatasource,
    ){}

    getUser(getUserDto: GetUserDto): Promise<UserEntity> {
        return this.userDatasource.getUser(getUserDto);
    }

}