import { Email, UniqueEntityId, User, UserRole } from '../../domain';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { InvalidRefreshTokenException } from '../exceptions/invalid-refresh-token.exception';
import type {
  AuthenticationTokenPayload,
  AuthenticationTokenService,
  PasswordHasher,
} from '../interfaces/authentication.interface';
import type { UserRepositoryPort } from '../interfaces/application-repository.interface';
import { AuthenticationApplicationService } from './authentication-application.service';

describe('AuthenticationApplicationService', () => {
  const user = new User(
    {
      email: new Email('fan@example.com'),
      passwordHash: 'password-hash',
      refreshTokenHash: 'refresh-token-hash',
    },
    new UniqueEntityId('user-1'),
  );
  const repository: jest.Mocked<UserRepositoryPort> = {
    create: jest.fn(async (entity: User) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [user]),
    findByEmail: jest.fn(async (_email: Email) => user),
    findById: jest.fn(async (_id: UniqueEntityId) => user),
    update: jest.fn(async (_id: UniqueEntityId, entity: User) => entity),
  };
  const passwordHasher: jest.Mocked<PasswordHasher> = {
    hash: jest.fn(async (value: string) => `hash:${value}`),
    verify: jest.fn(async (_value: string, _hash: string): Promise<boolean> => true),
  };
  const tokenService: jest.Mocked<AuthenticationTokenService> = {
    createAccessToken: jest.fn(async (_payload): Promise<string> => 'access-token'),
    createRefreshToken: jest.fn(async (_payload): Promise<string> => 'refresh-token'),
    verifyRefreshToken: jest.fn(async (_token: string): Promise<AuthenticationTokenPayload> => ({
      email: 'fan@example.com',
      role: UserRole.USER,
      sub: 'user-1',
      tokenType: 'refresh',
    })),
  };
  const service = new AuthenticationApplicationService(repository, passwordHasher, tokenService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('validates credentials, creates both tokens, and persists only a refresh-token hash', async () => {
    await expect(service.login({ email: 'fan@example.com', password: 'a-strong-password' })).resolves.toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    expect(passwordHasher.verify).toHaveBeenCalledWith('a-strong-password', 'password-hash');
    expect(repository.update).toHaveBeenCalledWith(
      new UniqueEntityId('user-1'),
      expect.objectContaining({ refreshTokenHash: 'hash:refresh-token' }),
    );
  });

  it('rejects users without a migrated password without issuing tokens', async () => {
    repository.findByEmail.mockResolvedValueOnce(
      new User({ email: new Email('fan@example.com') }, new UniqueEntityId('user-1')),
    );

    await expect(service.login({ email: 'fan@example.com', password: 'a-strong-password' })).rejects.toBeInstanceOf(
      InvalidCredentialsException,
    );
    expect(tokenService.createAccessToken).not.toHaveBeenCalled();
  });

  it('rotates a verified refresh token and rejects an invalid refresh token', async () => {
    await expect(service.refresh('refresh-token')).resolves.toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    passwordHasher.verify.mockResolvedValueOnce(false);
    await expect(service.refresh('refresh-token')).rejects.toBeInstanceOf(InvalidRefreshTokenException);
  });

  it('removes the stored refresh-token hash on logout', async () => {
    await expect(service.logout('refresh-token')).resolves.toBeUndefined();
    expect(repository.update).toHaveBeenCalledWith(
      new UniqueEntityId('user-1'),
      expect.objectContaining({ refreshTokenHash: undefined }),
    );
  });
});
