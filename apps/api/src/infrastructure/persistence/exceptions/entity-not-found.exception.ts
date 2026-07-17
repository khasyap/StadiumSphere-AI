import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  public constructor(entityName: string, id: string) {
    super(`${entityName} with id ${id} was not found.`);
  }
}
