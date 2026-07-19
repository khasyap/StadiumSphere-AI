import { Stadium } from '../../domain';
import type { StadiumRepositoryPort } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
export interface StadiumCreateCommand {
    capacity: number;
    name: string;
}
export interface StadiumUpdateCommand {
    capacity?: number;
    name?: string;
}
export declare class StadiumApplicationService extends CrudApplicationService<Stadium, StadiumCreateCommand, StadiumUpdateCommand> {
    constructor(repository: StadiumRepositoryPort);
    protected createEntity(command: StadiumCreateCommand): Stadium;
    protected updateEntity(current: Stadium, command: StadiumUpdateCommand): Stadium;
}
