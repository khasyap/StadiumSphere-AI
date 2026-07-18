import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AUTHENTICATION_TOKEN_SERVICE, PASSWORD_HASHER } from '../../application/interfaces/authentication.interface';
import { BcryptPasswordHasher } from './bcrypt-password-hasher';
import { JwtStrategy } from './jwt.strategy';
import { JwtTokenService } from './jwt-token.service';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  providers: [
    BcryptPasswordHasher,
    JwtTokenService,
    JwtStrategy,
    { provide: PASSWORD_HASHER, useExisting: BcryptPasswordHasher },
    { provide: AUTHENTICATION_TOKEN_SERVICE, useExisting: JwtTokenService },
  ],
  exports: [PASSWORD_HASHER, AUTHENTICATION_TOKEN_SERVICE],
})
export class AuthenticationInfrastructureModule {}
