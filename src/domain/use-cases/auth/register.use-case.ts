import type { RegisterDto } from "@/domain/dtos/auth/register.dto";
import type { UserEntity } from "@/domain/entities/user.entity";
import type { AuthRepository } from "@/domain/repositories/auth.repository";

interface RegisterUseCase{
    execute(registerDto: RegisterDto): Promise<UserEntity>;
}

export class Register implements RegisterUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(registerDto: RegisterDto): Promise<UserEntity> {
        const userEntity = await this.authRepository.register(registerDto)
        return userEntity
    }

}