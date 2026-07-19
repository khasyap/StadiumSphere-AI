import { User } from '../../domain';
import type { UserDto } from '../dto/user.dto';
import type { Mapper } from '../interfaces/mapper.interface';
export declare class UserMapper implements Mapper<User, UserDto> {
    toDomain(dto: UserDto): User;
    toDto(domain: User): UserDto;
}
