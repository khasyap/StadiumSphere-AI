import { Email, UniqueEntityId, User } from '../../domain';
import type { UserPersistence } from '../schemas/user.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class UserPersistenceMapper implements PersistenceMapper<User, UserPersistence> {
  public toDomain(document: PersistenceRecord<UserPersistence>): User {
    return new User({ email: new Email(document.email) }, new UniqueEntityId(document.id));
  }

  public toPersistence(entity: User): Partial<UserPersistence> {
    return { email: entity.toJSON().email.value };
  }
}
