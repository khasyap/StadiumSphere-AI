import { Inject, Injectable } from '@nestjs/common';

import { Sport, Team, UniqueEntityId } from '../../domain';
import { ApplicationEntityNotFoundException } from '../exceptions/application-entity-not-found.exception';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { SportRepositoryPort, TeamRepositoryPort } from '../interfaces/application-repository.interface';
import { SPORT_REPOSITORY, TEAM_REPOSITORY } from '../interfaces/application-repository.interface';
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
  public constructor(
    @Inject(TEAM_REPOSITORY) private readonly teamRepository: TeamRepositoryPort,
    @Inject(SPORT_REPOSITORY) private readonly sportRepository: SportRepositoryPort,
  ) {
    super(teamRepository);
  }

  public override async create(command: TeamCreateCommand): Promise<Record<string, unknown>> {
    const sport = await this.getSport(command.sportId);
    this.assertSportName(command.sportName, sport);
    await this.assertNameAvailable(sport.id, command.name);

    return super.create({ ...command, sportName: sport.toJSON().name });
  }

  public override async update(
    id: string,
    command: TeamUpdateCommand,
  ): Promise<Record<string, unknown>> {
    const team = await this.getTeam(id);

    if (command.sportName !== undefined && command.sportId === undefined) {
      throw new ApplicationValidationException('sportName can only be changed with sportId.');
    }

    if (command.sportId === undefined) {
      await this.assertNameAvailable(team.toJSON().sport.id, command.name ?? team.toJSON().name, id);
      return super.update(id, command);
    }

    const sport = await this.getSport(command.sportId);

    if (command.sportName !== undefined) {
      this.assertSportName(command.sportName, sport);
    }

    await this.assertNameAvailable(sport.id, command.name ?? team.toJSON().name, id);

    return super.update(id, { ...command, sportName: sport.toJSON().name });
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

  private async getSport(sportId: string): Promise<Sport> {
    const sport = await this.sportRepository.findById(new UniqueEntityId(sportId));

    if (sport === null) {
      throw new ApplicationEntityNotFoundException(sportId);
    }

    return sport;
  }

  private async getTeam(id: string): Promise<Team> {
    const team = await this.teamRepository.findById(new UniqueEntityId(id));

    if (team === null) {
      throw new ApplicationEntityNotFoundException(id);
    }

    return team;
  }

  private assertSportName(sportName: string, sport: Sport): void {
    if (sportName !== sport.toJSON().name) {
      throw new ApplicationValidationException('sportName must match the referenced Sport.');
    }
  }

  private async assertNameAvailable(
    sportId: UniqueEntityId,
    name: string,
    currentId?: string,
  ): Promise<void> {
    const team = await this.teamRepository.findBySportIdAndName(sportId, name);

    if (team !== null && team.id.toString() !== currentId) {
      throw new ApplicationValidationException('A Team with this name already exists for the Sport.');
    }
  }
}
