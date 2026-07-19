import { User } from '../../domain';
import type { UserPersistence } from '../schemas/user.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';
export declare class UserPersistenceMapper implements PersistenceMapper<User, UserPersistence> {
    toDomain(document: PersistenceRecord<UserPersistence>): User;
    toPersistence(entity: User): Partial<UserPersistence>;
}
