import { InternalServerErrorException } from '@nestjs/common';

export class PersistenceException extends InternalServerErrorException {
  public constructor(message = 'A persistence operation failed.') {
    super(message);
  }
}
