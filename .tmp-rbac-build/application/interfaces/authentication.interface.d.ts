import type { UserRole } from '../../domain';
export interface AuthenticationTokenPayload {
    readonly email: string;
    readonly role: UserRole;
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
export declare const AUTHENTICATION_TOKEN_SERVICE: unique symbol;
export declare const PASSWORD_HASHER: unique symbol;
