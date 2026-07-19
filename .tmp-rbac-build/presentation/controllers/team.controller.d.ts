import type { RestApplicationService } from '../../application';
import { CreateTeamDto, UpdateTeamDto } from '../dto/team.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';
export declare class TeamController extends ResourceController<CreateTeamDto, UpdateTeamDto, unknown> {
    constructor(service: RestApplicationService<CreateTeamDto, UpdateTeamDto, unknown>);
    list(): Promise<SuccessResponse<readonly unknown[]>>;
    getById(id: string): Promise<SuccessResponse<unknown>>;
    create(dto: CreateTeamDto): Promise<SuccessResponse<unknown>>;
    update(id: string, dto: UpdateTeamDto): Promise<SuccessResponse<unknown>>;
    delete(id: string): Promise<SuccessResponse<undefined>>;
}
