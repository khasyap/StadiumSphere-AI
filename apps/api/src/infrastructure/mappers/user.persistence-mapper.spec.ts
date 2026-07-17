import { Email, UniqueEntityId, User } from '../../domain';
import { UserPersistenceMapper } from './user.persistence-mapper';

describe('UserPersistenceMapper', () => {
  const mapper = new UserPersistenceMapper();

  it('maps persistence fields into a domain entity', () => {
    const user = mapper.toDomain({ email: 'USER@example.com', id: 'user-1' });

    expect(user).toBeInstanceOf(User);
    expect(user.toJSON()).toMatchObject({ id: 'user-1' });
  });

  it('maps a domain entity into persistence fields without DTO concerns', () => {
    const user = new User({ email: new Email('user@example.com') }, new UniqueEntityId('user-1'));

    expect(mapper.toPersistence(user)).toEqual({ email: 'user@example.com' });
  });
});
