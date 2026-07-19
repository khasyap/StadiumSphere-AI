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
    @Inject(SPORT_REPOSITORY) private readonly sportRepository: SportRepositoryPort,
    @Inject(TEAM_REPOSITORY) private readonly teamRepository: TeamRepositoryPort,
  ) {
    super(sportRepository);
  }

  public override async delete(id: string): Promise<void> {
    if (await this.teamRepository.existsBySportId(new UniqueEntityId(id))) {
      throw new ApplicationValidationException('Sport cannot be deleted while Teams reference it.');
    }

    await super.delete(id);
  }

  public override async create(command: SportCreateCommand): Promise<Record<string, unknown>> {
    await this.assertNameAvailable(command.name);
    return super.create(command);
  }

  public override async update(
    id: string,
    command: SportUpdateCommand,
  ): Promise<Record<string, unknown>> {
    if (command.name !== undefined) {
      await this.assertNameAvailable(command.name, id);
    }

    return super.update(id, command);
  }

  protected createEntity(command: SportCreateCommand): Sport {
    return new Sport({ name: command.name });
  }

  protected updateEntity(current: Sport, command: SportUpdateCommand): Sport {
    return new Sport({ name: command.name ?? current.toJSON().name }, current.id);
  }

  private async assertNameAvailable(name: string, currentId?: string): Promise<void> {
    const sport = await this.sportRepository.findByName(name);

    if (sport !== null && sport.id.toString() !== currentId) {
      throw new ApplicationValidationException('A Sport with this name already exists.');
    }
  }
}
