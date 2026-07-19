export declare class SuccessResponse<TData> {
    readonly message: string;
    readonly data: TData;
    readonly success = true;
    constructor(message: string, data: TData);
}
