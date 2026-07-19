import { EventApplicationService } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';
export declare class EventController extends ResourceController<CreateEventDto, UpdateEventDto, unknown> {
    private readonly workflowService;
    constructor(workflowService: EventWorkflowService);
    list(): Promise<SuccessResponse<readonly unknown[]>>;
    getById(id: string): Promise<SuccessResponse<unknown>>;
    create(dto: CreateEventDto): Promise<SuccessResponse<unknown>>;
    update(id: string, dto: UpdateEventDto): Promise<SuccessResponse<unknown>>;
    delete(id: string): Promise<SuccessResponse<undefined>>;
    start(id: string): Promise<SuccessResponse<unknown>>;
    finish(id: string): Promise<SuccessResponse<unknown>>;
    cancel(id: string): Promise<SuccessResponse<unknown>>;
}
type EventWorkflowService = RestApplicationService<CreateEventDto, UpdateEventDto, unknown> & Pick<EventApplicationService, 'cancel' | 'finish' | 'start'>;
export {};
