import { HttpException } from '@nestjs/common';
import type { HttpStatus } from '@nestjs/common';

export class ApplicationException extends HttpException {
  public constructor(
    message: string,
    public readonly code: string,
    statusCode: HttpStatus,
  ) {
    super({ code, message }, statusCode);
    this.name = new.target.name;
  }
}
