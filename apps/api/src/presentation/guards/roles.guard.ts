import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

import type { UserRole } from '../../domain';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<readonly UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles === undefined || roles.length === 0) {
      return true;
    }

    const user = context.switchToHttp().getRequest<{ user?: AuthenticatedUser }>().user;

    if (user === undefined || !roles.includes(user.role)) {
      throw new ForbiddenException('Insufficient role.');
    }

    return true;
  }
}
