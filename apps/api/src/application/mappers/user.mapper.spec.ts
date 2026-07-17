import { User } from '../../domain';
import { UserMapper } from './user.mapper';

describe('UserMapper', () => {
  const mapper = new UserMapper();

  it('maps a DTO into the existing domain entity', () => {
    const user = mapper.toDomain({ id: 'user-1', email: 'USER@example.com' });

    expect(user).toBeInstanceOf(User);
    expect(user.id.toString()).toBe('user-1');
  });

  it('maps a domain entity into a DTO', () => {
    expect(mapper.toDto(mapper.toDomain({ id: 'user-1', email: 'USER@example.com' }))).toEqual({
      id: 'user-1',
      email: 'user@example.com',
    });
  });
});
