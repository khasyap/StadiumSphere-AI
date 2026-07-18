import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type { AuthenticationTokenPayload, AuthenticationTokenService } from '../../application/interfaces/authentication.interface';
import type { ApiEnvironment } from '../../config/environment.validation';

@Injectable()
export class JwtTokenService implements AuthenticationTokenService {
  public constructor(
    @Inject(ConfigService) private readonly configuration: ConfigService<ApiEnvironment, true>,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  public createAccessToken(
    payload: Omit<AuthenticationTokenPayload, 'tokenType'>,
  ): Promise<string> {
    return this.jwtService.signAsync(
      { ...payload, tokenType: 'access' },
      {
        expiresIn: this.configuration.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
        secret: this.configuration.getOrThrow('JWT_ACCESS_SECRET'),
      },
    );
  }

  public createRefreshToken(
    payload: Omit<AuthenticationTokenPayload, 'tokenType'>,
  ): Promise<string> {
    return this.jwtService.signAsync(
      { ...payload, tokenType: 'refresh' },
      {
        expiresIn: this.configuration.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
        secret: this.configuration.getOrThrow('JWT_REFRESH_SECRET'),
      },
    );
  }

  public verifyRefreshToken(token: string): Promise<AuthenticationTokenPayload> {
    return this.jwtService.verifyAsync<AuthenticationTokenPayload>(token, {
      secret: this.configuration.getOrThrow('JWT_REFRESH_SECRET'),
    });
  }
}
