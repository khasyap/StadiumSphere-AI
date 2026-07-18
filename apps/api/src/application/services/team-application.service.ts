import { Inject, Injectable } from '@nestjs/common';

import { Sport, Team, UniqueEntityId } from '../../domain';
import type { TeamRepositoryPort } from '../interfaces/application-repository.interface';
import { TEAM_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';

export interface TeamCreateCommand {
  name: string;
  sportId: string;
  sportName: string;
}

export interface TeamUpdateCommand {
  name?: string;
  sportId?: string;
  sportName?: string;
}

@Injectable()
export class TeamApplicationService extends CrudApplicationService<
  Team,
  TeamCreateCommand,
  TeamUpdateCommand
> {
  public constructor(@Inject(TEAM_REPOSITORY) repository: TeamRepositoryPort) {
    super(repository);
  }

  protected createEntity(command: TeamCreateCommand): Team {
    return new Team({ name: command.name, sport: this.createSport(command) });
  }

  protected updateEntity(current: Team, command: TeamUpdateCommand): Team {
    const team = current.toJSON();
    const sport = team.sport.toJSON();

    return new Team(
      {
        name: command.name ?? team.name,
        sport: new Sport(
          { name: command.sportName ?? sport.name },
          new UniqueEntityId(command.sportId ?? sport.id),
        ),
      },
      current.id,
    );
  }

  private createSport(command: TeamCreateCommand): Sport {
    return new Sport({ name: command.sportName }, new UniqueEntityId(command.sportId));
  }
}
