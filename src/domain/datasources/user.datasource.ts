import type { GetUserDto } from "../dtos/user/get-user.dto";
import type { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {

    abstract getUser(getUserDto: GetUserDto): Promise<UserEntity>;

}