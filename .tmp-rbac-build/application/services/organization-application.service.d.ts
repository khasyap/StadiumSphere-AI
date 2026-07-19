import { Organization } from '../../domain';
import type { OrganizationRepositoryPort } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
export interface OrganizationCreateCommand {
    name: string;
}
export interface OrganizationUpdateCommand {
    name?: string;
}
export declare class OrganizationApplicationService extends CrudApplicationService<Organization, OrganizationCreateCommand, OrganizationUpdateCommand> {
    constructor(repository: OrganizationRepositoryPort);
    protected createEntity(command: OrganizationCreateCommand): Organization;
    protected updateEntity(current: Organization, command: OrganizationUpdateCommand): Organization;
}
