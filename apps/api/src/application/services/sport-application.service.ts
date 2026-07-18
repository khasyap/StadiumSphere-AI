import { Inject, Injectable } from '@nestjs/common';

import { Sport, UniqueEntityId } from '../../domain';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { SportRepositoryPort, TeamRepositoryPort } from '../interfaces/application-repository.interface';
import { SPORT_REPOSITORY, TEAM_REPOSITORY } from '../interfaces/application-repository.interface';
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
  public constructor(
    @Inject(SPORT_REPOSITORY) repository: SportRepositoryPort,
    @Inject(TEAM_REPOSITORY) private readonly teamRepository: TeamRepositoryPort,
  ) {
    super(repository);
  }

  public override async delete(id: string): Promise<void> {
    if (await this.teamRepository.existsBySportId(new UniqueEntityId(id))) {
      throw new ApplicationValidationException('Sport cannot be deleted while Teams reference it.');
    }

    await super.delete(id);
  }

  protected createEntity(command: SportCreateCommand): Sport {
    return new Sport({ name: command.name });
  }

  protected updateEntity(current: Sport, command: SportUpdateCommand): Sport {
    return new Sport({ name: command.name ?? current.toJSON().name }, current.id);
  }
}
