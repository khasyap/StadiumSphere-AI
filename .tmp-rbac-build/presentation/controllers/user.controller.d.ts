import type { RestApplicationService } from '../../application';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';
export declare class UserController extends ResourceController<CreateUserDto, UpdateUserDto, unknown> {
    constructor(service: RestApplicationService<CreateUserDto, UpdateUserDto, unknown>);
    list(): Promise<SuccessResponse<readonly unknown[]>>;
    getById(id: string): Promise<SuccessResponse<unknown>>;
    create(dto: CreateUserDto): Promise<SuccessResponse<unknown>>;
    update(id: string, dto: UpdateUserDto): Promise<SuccessResponse<unknown>>;
    delete(id: string): Promise<SuccessResponse<undefined>>;
}
