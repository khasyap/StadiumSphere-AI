import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import type { PasswordHasher } from '../../application/interfaces/authentication.interface';
import type { ApiEnvironment } from '../../config/environment.validation';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  public constructor(
    @Inject(ConfigService) private readonly configuration: ConfigService<ApiEnvironment, true>,
  ) {}

  public hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.configuration.getOrThrow('BCRYPT_SALT_ROUNDS'));
  }

  public verify(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
