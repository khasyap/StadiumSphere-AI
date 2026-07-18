import type { AuthenticationApplicationService, LoginCommand } from '../../application';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  const service = {
    login: jest.fn(async (_command: LoginCommand) => ({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    })),
    logout: jest.fn(async (_refreshToken: string) => undefined),
    refresh: jest.fn(async (_refreshToken: string) => ({
      accessToken: 'access-token',
      refreshToken: 'rotated-refresh-token',
    })),
  };
  const controller = new AuthenticationController(service as unknown as AuthenticationApplicationService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates login, refresh, and logout requests to the application service', async () => {
    await expect(controller.login({ email: 'fan@example.com', password: 'a-strong-password' })).resolves.toMatchObject({
      data: { accessToken: 'access-token' },
      message: 'Authentication successful.',
    });
    await expect(controller.refresh({ refreshToken: 'refresh-token' })).resolves.toMatchObject({
      data: { refreshToken: 'rotated-refresh-token' },
    });
    await expect(controller.logout({ refreshToken: 'refresh-token' })).resolves.toMatchObject({
      message: 'Logout successful.',
    });
  });
});
