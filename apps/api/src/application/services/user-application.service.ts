import { Inject, Injectable } from '@nestjs/common';

import { Email, User } from '../../domain';
import type { UserProps } from '../../domain';
import type { UserRepositoryPort } from '../interfaces/application-repository.interface';
import { USER_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';

export interface UserCreateCommand {
  email: string;
}

export interface UserUpdateCommand {
  email?: string;
}

@Injectable()
export class UserApplicationService extends CrudApplicationService<
  User,
  UserCreateCommand,
  UserUpdateCommand
> {
  public constructor(@Inject(USER_REPOSITORY) repository: UserRepositoryPort) {
    super(repository);
  }

  protected createEntity(command: UserCreateCommand): User {
    return new User({ email: new Email(command.email) });
  }

  protected updateEntity(current: User, command: UserUpdateCommand): User {
    const user = current.toJSON();
    const properties: UserProps = { email: new Email(command.email ?? user.email.value) };

    properties.role = current.role;

    if (current.passwordHash !== undefined) {
      properties.passwordHash = current.passwordHash;
    }

    if (current.refreshTokenHash !== undefined) {
      properties.refreshTokenHash = current.refreshTokenHash;
    }

    return new User(properties, current.id);
  }
}
