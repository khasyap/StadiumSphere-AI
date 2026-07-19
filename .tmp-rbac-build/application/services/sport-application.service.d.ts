import { Sport } from '../../domain';
import type { SportRepositoryPort, TeamRepositoryPort } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
export interface SportCreateCommand {
    name: string;
}
export interface SportUpdateCommand {
    name?: string;
}
export declare class SportApplicationService extends CrudApplicationService<Sport, SportCreateCommand, SportUpdateCommand> {
    private readonly teamRepository;
    constructor(repository: SportRepositoryPort, teamRepository: TeamRepositoryPort);
    delete(id: string): Promise<void>;
    protected createEntity(command: SportCreateCommand): Sport;
    protected updateEntity(current: Sport, command: SportUpdateCommand): Sport;
}
