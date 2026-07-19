import type { RestApplicationService } from '../../application';
import { CreateSportDto, UpdateSportDto } from '../dto/sport.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';
export declare class SportController extends ResourceController<CreateSportDto, UpdateSportDto, unknown> {
    constructor(service: RestApplicationService<CreateSportDto, UpdateSportDto, unknown>);
    list(): Promise<SuccessResponse<readonly unknown[]>>;
    getById(id: string): Promise<SuccessResponse<unknown>>;
    create(dto: CreateSportDto): Promise<SuccessResponse<unknown>>;
    update(id: string, dto: UpdateSportDto): Promise<SuccessResponse<unknown>>;
    delete(id: string): Promise<SuccessResponse<undefined>>;
}
