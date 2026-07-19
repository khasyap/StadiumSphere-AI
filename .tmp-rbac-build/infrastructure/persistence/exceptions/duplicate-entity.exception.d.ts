import { ConflictException } from '@nestjs/common';
export declare class DuplicateEntityException extends ConflictException {
    constructor(entityName: string);
}
