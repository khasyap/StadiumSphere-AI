import { ForbiddenException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';

import { UserRole } from '../../domain';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  const reflector = {
    getAllAndOverride: jest.fn(),
  };
  const guard = new RolesGuard(reflector as unknown as Reflector);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows a user whose JWT role is required by the route', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);

    expect(guard.canActivate(createContext(UserRole.ADMIN))).toBe(true);
  });

  it('rejects an authenticated user without the required role', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);

    expect(() => guard.canActivate(createContext(UserRole.USER))).toThrow(ForbiddenException);
  });

  it('allows routes without role metadata after authentication has completed', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);

    expect(guard.canActivate(createContext(UserRole.USER))).toBe(true);
  });

  function createContext(role: UserRole): ExecutionContext {
    return {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { email: 'fan@example.com', role, sub: 'user-1' } }),
      }),
    } as unknown as ExecutionContext;
  }
});
