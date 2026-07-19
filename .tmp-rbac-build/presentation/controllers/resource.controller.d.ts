import type { RestApplicationService } from '../../application';
import { SuccessResponse } from '../responses/success.response';
export declare abstract class ResourceController<TCreate, TUpdate, TResponse> {
    protected readonly service: RestApplicationService<TCreate, TUpdate, TResponse>;
    private readonly resourceName;
    protected constructor(service: RestApplicationService<TCreate, TUpdate, TResponse>, resourceName: string);
    protected createResource(command: TCreate): Promise<SuccessResponse<TResponse>>;
    protected deleteResource(id: string): Promise<SuccessResponse<undefined>>;
    protected getResource(id: string): Promise<SuccessResponse<TResponse>>;
    protected listResources(): Promise<SuccessResponse<readonly TResponse[]>>;
    protected updateResource(id: string, command: TUpdate): Promise<SuccessResponse<TResponse>>;
}
