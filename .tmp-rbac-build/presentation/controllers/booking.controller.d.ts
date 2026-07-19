import { BookingApplicationService } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';
export declare class BookingController extends ResourceController<CreateBookingDto, UpdateBookingDto, unknown> {
    private readonly workflowService;
    constructor(workflowService: BookingWorkflowService);
    list(): Promise<SuccessResponse<readonly unknown[]>>;
    getById(id: string): Promise<SuccessResponse<unknown>>;
    create(dto: CreateBookingDto): Promise<SuccessResponse<unknown>>;
    update(id: string, dto: UpdateBookingDto): Promise<SuccessResponse<unknown>>;
    delete(id: string): Promise<SuccessResponse<undefined>>;
    confirm(id: string): Promise<SuccessResponse<unknown>>;
    cancel(id: string): Promise<SuccessResponse<unknown>>;
    checkIn(id: string): Promise<SuccessResponse<unknown>>;
    complete(id: string): Promise<SuccessResponse<unknown>>;
}
type BookingWorkflowService = RestApplicationService<CreateBookingDto, UpdateBookingDto, unknown> & Pick<BookingApplicationService, 'cancel' | 'checkIn' | 'complete' | 'confirm'>;
export {};
