import type { LoginDto } from "../dtos/auth/login.dto";
import type { RegisterDto } from "../dtos/auth/register.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource{

    abstract login(loginDto: LoginDto): Promise<UserEntity>;
    abstract register(registerDto: RegisterDto): Promise<UserEntity>;

}