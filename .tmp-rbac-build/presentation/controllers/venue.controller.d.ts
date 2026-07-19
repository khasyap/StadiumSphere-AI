import type { RestApplicationService } from '../../application';
import { CreateVenueDto, UpdateVenueDto } from '../dto/venue.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';
export declare class VenueController extends ResourceController<CreateVenueDto, UpdateVenueDto, unknown> {
    constructor(service: RestApplicationService<CreateVenueDto, UpdateVenueDto, unknown>);
    list(): Promise<SuccessResponse<readonly unknown[]>>;
    getById(id: string): Promise<SuccessResponse<unknown>>;
    create(dto: CreateVenueDto): Promise<SuccessResponse<unknown>>;
    update(id: string, dto: UpdateVenueDto): Promise<SuccessResponse<unknown>>;
    delete(id: string): Promise<SuccessResponse<undefined>>;
}
