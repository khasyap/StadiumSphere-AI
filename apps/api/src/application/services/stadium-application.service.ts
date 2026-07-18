import { Inject, Injectable } from '@nestjs/common';

import { Capacity, Stadium } from '../../domain';
import type { StadiumRepositoryPort } from '../interfaces/application-repository.interface';
import { STADIUM_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';

export interface StadiumCreateCommand {
  capacity: number;
  name: string;
}

export interface StadiumUpdateCommand {
  capacity?: number;
  name?: string;
}

@Injectable()
export class StadiumApplicationService extends CrudApplicationService<
  Stadium,
  StadiumCreateCommand,
  StadiumUpdateCommand
> {
  public constructor(@Inject(STADIUM_REPOSITORY) repository: StadiumRepositoryPort) {
    super(repository);
  }

  protected createEntity(command: StadiumCreateCommand): Stadium {
    return new Stadium({ capacity: new Capacity(command.capacity), name: command.name });
  }

  protected updateEntity(current: Stadium, command: StadiumUpdateCommand): Stadium {
    const stadium = current.toJSON();
    return new Stadium(
      {
        capacity: new Capacity(command.capacity ?? stadium.capacity.value),
        name: command.name ?? stadium.name,
      },
      current.id,
    );
  }
}
