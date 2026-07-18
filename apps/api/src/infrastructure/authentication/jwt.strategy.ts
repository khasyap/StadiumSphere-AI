import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { AuthenticationTokenPayload } from '../../application/interfaces/authentication.interface';
import type { ApiEnvironment } from '../../config/environment.validation';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(@Inject(ConfigService) configuration: ConfigService<ApiEnvironment, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configuration.getOrThrow('JWT_ACCESS_SECRET'),
    });
  }

  public validate(payload: AuthenticationTokenPayload): Omit<AuthenticationTokenPayload, 'tokenType'> {
    if (payload.tokenType !== 'access') {
      throw new UnauthorizedException('Invalid access token.');
    }

    return { email: payload.email, sub: payload.sub };
  }
}
