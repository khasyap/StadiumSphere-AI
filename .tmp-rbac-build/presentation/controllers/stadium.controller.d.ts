import type { RestApplicationService } from '../../application';
import { CreateStadiumDto, UpdateStadiumDto } from '../dto/stadium.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';
export declare class StadiumController extends ResourceController<CreateStadiumDto, UpdateStadiumDto, unknown> {
    constructor(service: RestApplicationService<CreateStadiumDto, UpdateStadiumDto, unknown>);
    list(): Promise<SuccessResponse<readonly unknown[]>>;
    getById(id: string): Promise<SuccessResponse<unknown>>;
    create(dto: CreateStadiumDto): Promise<SuccessResponse<unknown>>;
    update(id: string, dto: UpdateStadiumDto): Promise<SuccessResponse<unknown>>;
    delete(id: string): Promise<SuccessResponse<undefined>>;
}
