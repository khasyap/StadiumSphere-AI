import { HttpException } from '@nestjs/common';
import type { HttpStatus } from '@nestjs/common';
export declare class ApplicationException extends HttpException {
    readonly code: string;
    constructor(message: string, code: string, statusCode: HttpStatus);
}
