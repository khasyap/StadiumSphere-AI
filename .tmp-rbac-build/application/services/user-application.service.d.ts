import { User } from '../../domain';
import type { UserRepositoryPort } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
export interface UserCreateCommand {
    email: string;
}
export interface UserUpdateCommand {
    email?: string;
}
export declare class UserApplicationService extends CrudApplicationService<User, UserCreateCommand, UserUpdateCommand> {
    constructor(repository: UserRepositoryPort);
    protected createEntity(command: UserCreateCommand): User;
    protected updateEntity(current: User, command: UserUpdateCommand): User;
}
