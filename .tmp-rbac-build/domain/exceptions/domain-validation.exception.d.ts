import { BadRequestException } from '@nestjs/common';
export declare class DomainValidationException extends BadRequestException {
    constructor(message: string);
}
