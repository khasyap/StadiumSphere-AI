import { Email, UniqueEntityId, User, UserRole } from '../../domain';
import type { UserProps } from '../../domain';
import type { UserPersistence } from '../schemas/user.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class UserPersistenceMapper implements PersistenceMapper<User, UserPersistence> {
  public toDomain(document: PersistenceRecord<UserPersistence>): User {
    const properties: UserProps = { email: new Email(document.email) };

    properties.role = document.role ?? UserRole.USER;

    if (document.passwordHash !== undefined) {
      properties.passwordHash = document.passwordHash;
    }

    if (document.refreshTokenHash !== undefined) {
      properties.refreshTokenHash = document.refreshTokenHash;
    }

    return new User(properties, new UniqueEntityId(document.id));
  }

  public toPersistence(entity: User): Partial<UserPersistence> {
    const persistence: Partial<UserPersistence> = {
      email: entity.toJSON().email.value,
      role: entity.role,
    };

    if (entity.passwordHash !== undefined) {
      persistence.passwordHash = entity.passwordHash;
    }

    if (entity.refreshTokenHash !== undefined) {
      persistence.refreshTokenHash = entity.refreshTokenHash;
    }

    return persistence;
  }
}
