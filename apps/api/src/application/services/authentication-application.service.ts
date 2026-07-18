import { Inject, Injectable } from '@nestjs/common';

import { Email, UniqueEntityId, User } from '../../domain';
import type { UserProps } from '../../domain';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { InvalidRefreshTokenException } from '../exceptions/invalid-refresh-token.exception';
import type {
  AuthenticationTokenPayload,
  AuthenticationTokenService,
  PasswordHasher,
} from '../interfaces/authentication.interface';
import { AUTHENTICATION_TOKEN_SERVICE, PASSWORD_HASHER } from '../interfaces/authentication.interface';
import type { UserRepositoryPort } from '../interfaces/application-repository.interface';
import { USER_REPOSITORY } from '../interfaces/application-repository.interface';

export interface LoginCommand {
  email: string;
  password: string;
}

export interface AuthenticationTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
}

@Injectable()
export class AuthenticationApplicationService {
  public constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryPort,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasher,
    @Inject(AUTHENTICATION_TOKEN_SERVICE) private readonly tokenService: AuthenticationTokenService,
  ) {}

  public async login(command: LoginCommand): Promise<AuthenticationTokens> {
    const user = await this.userRepository.findByEmail(new Email(command.email));

    if (user === null || user.passwordHash === undefined) {
      throw new InvalidCredentialsException();
    }

    if (!(await this.passwordHasher.verify(command.password, user.passwordHash))) {
      throw new InvalidCredentialsException();
    }

    return this.issueTokens(user);
  }

  public async logout(refreshToken: string): Promise<void> {
    const user = await this.getRefreshTokenUser(refreshToken);
    await this.persistRefreshTokenHash(user, undefined);
  }

  public async refresh(refreshToken: string): Promise<AuthenticationTokens> {
    const user = await this.getRefreshTokenUser(refreshToken);
    return this.issueTokens(user);
  }

  private async getRefreshTokenUser(refreshToken: string): Promise<User> {
    let payload: AuthenticationTokenPayload;

    try {
      payload = await this.tokenService.verifyRefreshToken(refreshToken);
    } catch {
      throw new InvalidRefreshTokenException();
    }

    if (payload.tokenType !== 'refresh') {
      throw new InvalidRefreshTokenException();
    }

    const user = await this.userRepository.findById(new UniqueEntityId(payload.sub));

    if (
      user === null ||
      user.refreshTokenHash === undefined ||
      !(await this.passwordHasher.verify(refreshToken, user.refreshTokenHash))
    ) {
      throw new InvalidRefreshTokenException();
    }

    return user;
  }

  private async issueTokens(user: User): Promise<AuthenticationTokens> {
    const userJson = user.toJSON();
    const payload = { email: userJson.email.value, role: user.role, sub: userJson.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.createAccessToken(payload),
      this.tokenService.createRefreshToken(payload),
    ]);

    await this.persistRefreshTokenHash(user, await this.passwordHasher.hash(refreshToken));

    return { accessToken, refreshToken };
  }

  private async persistRefreshTokenHash(user: User, refreshTokenHash: string | undefined): Promise<void> {
    const userJson = user.toJSON();
    const properties: UserProps = { email: userJson.email };

    properties.role = user.role;

    if (user.passwordHash !== undefined) {
      properties.passwordHash = user.passwordHash;
    }

    if (refreshTokenHash !== undefined) {
      properties.refreshTokenHash = refreshTokenHash;
    }

    await this.userRepository.update(
      user.id,
      new User(properties, user.id),
    );
  }
}
