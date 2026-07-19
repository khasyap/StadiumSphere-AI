import type { RestApplicationService } from '../../application';
import { CreateOrganizationDto, UpdateOrganizationDto } from '../dto/organization.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';
export declare class OrganizationController extends ResourceController<CreateOrganizationDto, UpdateOrganizationDto, unknown> {
    constructor(service: RestApplicationService<CreateOrganizationDto, UpdateOrganizationDto, unknown>);
    list(): Promise<SuccessResponse<readonly unknown[]>>;
    getById(id: string): Promise<SuccessResponse<unknown>>;
    create(dto: CreateOrganizationDto): Promise<SuccessResponse<unknown>>;
    update(id: string, dto: UpdateOrganizationDto): Promise<SuccessResponse<unknown>>;
    delete(id: string): Promise<SuccessResponse<undefined>>;
}
