import { HttpStatus } from '@nestjs/common';

import { ApplicationException } from './application.exception';

export class InvalidRefreshTokenException extends ApplicationException {
  public constructor() {
    super('Invalid refresh token.', 'AUTHENTICATION_INVALID_REFRESH_TOKEN', HttpStatus.UNAUTHORIZED);
  }
}
