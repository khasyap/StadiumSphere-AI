import { Email, UniqueEntityId, User } from '../../domain';
import type { UserDto } from '../dto/user.dto';
import type { Mapper } from '../interfaces/mapper.interface';

export class UserMapper implements Mapper<User, UserDto> {
  public toDomain(dto: UserDto): User {
    return new User({ email: new Email(dto.email) }, new UniqueEntityId(dto.id));
  }

  public toDto(domain: User): UserDto {
    const user = domain.toJSON();

    return {
      id: user.id,
      email: user.email.value,
    };
  }
}
