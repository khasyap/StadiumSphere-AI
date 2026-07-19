import { NotFoundException } from '@nestjs/common';
export declare class EntityNotFoundException extends NotFoundException {
    constructor(entityName: string, id: string);
}
