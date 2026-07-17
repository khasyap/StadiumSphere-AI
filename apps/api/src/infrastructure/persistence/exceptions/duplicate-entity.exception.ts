import { ConflictException } from '@nestjs/common';

export class DuplicateEntityException extends ConflictException {
  public constructor(entityName: string) {
    super(`${entityName} already exists.`);
  }
}
