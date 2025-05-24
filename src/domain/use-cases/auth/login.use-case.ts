import type { LoginDto } from "@/domain/dtos/auth/login.dto";
import { UserEntity } from "@/domain/entities/user.entity";
import type { AuthRepository } from "@/domain/repositories/auth.repository";

interface LoginUseCase{
    execute(loginDto: LoginDto): Promise<UserEntity>;
}

export class Login implements LoginUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(loginDto: LoginDto): Promise<UserEntity> {
        
        const userEntity = await this.authRepository.login(loginDto)
        return userEntity
        
    }
}