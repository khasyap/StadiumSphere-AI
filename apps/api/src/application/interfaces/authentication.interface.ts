export interface AuthenticationTokenPayload {
  readonly email: string;
  readonly sub: string;
  readonly tokenType: 'access' | 'refresh';
}

export interface AuthenticationTokenService {
  createAccessToken(payload: Omit<AuthenticationTokenPayload, 'tokenType'>): Promise<string>;
  createRefreshToken(payload: Omit<AuthenticationTokenPayload, 'tokenType'>): Promise<string>;
  verifyRefreshToken(token: string): Promise<AuthenticationTokenPayload>;
}

export interface PasswordHasher {
  hash(value: string): Promise<string>;
  verify(value: string, hash: string): Promise<boolean>;
}

export const AUTHENTICATION_TOKEN_SERVICE = Symbol('Application.AuthenticationTokenService');
export const PASSWORD_HASHER = Symbol('Application.PasswordHasher');
