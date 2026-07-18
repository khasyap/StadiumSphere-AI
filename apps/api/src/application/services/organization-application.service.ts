import { Inject, Injectable } from '@nestjs/common';

import { Organization } from '../../domain';
import type { OrganizationRepositoryPort } from '../interfaces/application-repository.interface';
import { ORGANIZATION_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';

export interface OrganizationCreateCommand {
  name: string;
}

export interface OrganizationUpdateCommand {
  name?: string;
}

@Injectable()
export class OrganizationApplicationService extends CrudApplicationService<
  Organization,
  OrganizationCreateCommand,
  OrganizationUpdateCommand
> {
  public constructor(@Inject(ORGANIZATION_REPOSITORY) repository: OrganizationRepositoryPort) {
    super(repository);
  }

  protected createEntity(command: OrganizationCreateCommand): Organization {
    return new Organization({ name: command.name });
  }

  protected updateEntity(current: Organization, command: OrganizationUpdateCommand): Organization {
    return new Organization({ name: command.name ?? current.toJSON().name }, current.id);
  }
}
