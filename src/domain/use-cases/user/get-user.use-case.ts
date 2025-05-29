import type { GetUserDto } from "@/domain/dtos/user/get-user.dto";
import type { UserEntity } from "@/domain/entities/user.entity";
import type { UserRepository } from "@/domain/repositories/user.repository";

interface GetUserUseCase {
    execute(getUserDto: GetUserDto): Promise<UserEntity>;
}

export class GetUser implements GetUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ){}

    async execute(getUserDto: GetUserDto): Promise<UserEntity> {
        const userEntity = await this.userRepository.getUser(getUserDto);
        return userEntity;
    }

}