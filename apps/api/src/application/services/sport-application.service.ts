import { Inject, Injectable } from '@nestjs/common';

import { Sport } from '../../domain';
import type { SportRepositoryPort } from '../interfaces/application-repository.interface';
import { SPORT_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';

export interface SportCreateCommand {
  name: string;
}

export interface SportUpdateCommand {
  name?: string;
}

@Injectable()
export class SportApplicationService extends CrudApplicationService<
  Sport,
  SportCreateCommand,
  SportUpdateCommand
> {
  public constructor(@Inject(SPORT_REPOSITORY) repository: SportRepositoryPort) {
    super(repository);
  }

  protected createEntity(command: SportCreateCommand): Sport {
    return new Sport({ name: command.name });
  }

  protected updateEntity(current: Sport, command: SportUpdateCommand): Sport {
    return new Sport({ name: command.name ?? current.toJSON().name }, current.id);
  }
}
