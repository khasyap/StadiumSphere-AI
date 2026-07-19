import { Team } from '../../domain';
import type { SportRepositoryPort, TeamRepositoryPort } from '../interfaces/application-repository.interface';
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
export declare class TeamApplicationService extends CrudApplicationService<Team, TeamCreateCommand, TeamUpdateCommand> {
    private readonly sportRepository;
    constructor(repository: TeamRepositoryPort, sportRepository: SportRepositoryPort);
    create(command: TeamCreateCommand): Promise<Record<string, unknown>>;
    update(id: string, command: TeamUpdateCommand): Promise<Record<string, unknown>>;
    protected createEntity(command: TeamCreateCommand): Team;
    protected updateEntity(current: Team, command: TeamUpdateCommand): Team;
    private createSport;
    private getSport;
    private assertSportName;
}
