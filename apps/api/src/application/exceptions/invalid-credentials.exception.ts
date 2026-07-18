import { HttpStatus } from '@nestjs/common';

import { ApplicationException } from './application.exception';

export class InvalidCredentialsException extends ApplicationException {
  public constructor() {
    super('Invalid credentials.', 'AUTHENTICATION_INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);
  }
}
