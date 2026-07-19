export declare class ErrorResponse {
    readonly correlationId: string;
    readonly message: string;
    readonly statusCode: number;
    readonly timestamp: string;
    constructor(correlationId: string, message: string, statusCode: number, timestamp: string);
}
