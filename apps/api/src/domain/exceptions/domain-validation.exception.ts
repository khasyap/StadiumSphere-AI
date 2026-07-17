import { BadRequestException } from '@nestjs/common';

export class DomainValidationException extends BadRequestException {
  public constructor(message: string) {
    super(message);
  }
}
