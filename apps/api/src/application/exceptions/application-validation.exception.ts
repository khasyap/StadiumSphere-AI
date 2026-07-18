import { HttpStatus } from '@nestjs/common';

import { ApplicationException } from './application.exception';

export class ApplicationValidationException extends ApplicationException {
  public constructor(message: string) {
    super(message, 'APPLICATION_VALIDATION_ERROR', HttpStatus.BAD_REQUEST);
  }
}
