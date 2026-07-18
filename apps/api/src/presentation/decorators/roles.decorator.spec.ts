import { UserRole } from '../../domain';
import { ROLES_KEY, Roles } from './roles.decorator';

describe('Roles', () => {
  it('stores the required roles as route metadata', () => {
    class ProtectedResource {}

    Roles(UserRole.ADMIN, UserRole.MANAGER)(ProtectedResource);

    expect(Reflect.getMetadata(ROLES_KEY, ProtectedResource)).toEqual([
      UserRole.ADMIN,
      UserRole.MANAGER,
    ]);
  });
});
