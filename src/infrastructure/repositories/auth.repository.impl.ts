import { AuthDatasource } from "@/domain/datasources/auth.datasource";
import type { LoginDto } from "@/domain/dtos/auth/login.dto";
import type { RegisterDto } from "@/domain/dtos/auth/register.dto";
import type { UserEntity } from "@/domain/entities/user.entity";
import type { AuthRepository } from "@/domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDatasource: AuthDatasource
    ){}

    login(loginDto: LoginDto): Promise<UserEntity> {
        return this.authDatasource.login(loginDto)
    }

    register(registerDto: RegisterDto): Promise<UserEntity> {
        return this.authDatasource.register(registerDto)
    }

}