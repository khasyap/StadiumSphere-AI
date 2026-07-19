import { SuccessResponse } from './success.response';
export declare class PagedResponse<TData> extends SuccessResponse<readonly TData[]> {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    constructor(message: string, data: readonly TData[], page: number, limit: number, total: number);
}
