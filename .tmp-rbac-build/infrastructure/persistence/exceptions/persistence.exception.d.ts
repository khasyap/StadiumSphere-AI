import { InternalServerErrorException } from '@nestjs/common';
export declare class PersistenceException extends InternalServerErrorException {
    constructor(message?: string);
}
