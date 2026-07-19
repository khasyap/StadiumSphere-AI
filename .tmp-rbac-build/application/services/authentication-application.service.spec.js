"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const invalid_credentials_exception_1 = require("../exceptions/invalid-credentials.exception");
const invalid_refresh_token_exception_1 = require("../exceptions/invalid-refresh-token.exception");
const authentication_application_service_1 = require("./authentication-application.service");
describe('AuthenticationApplicationService', () => {
    const user = new domain_1.User({
        email: new domain_1.Email('fan@example.com'),
        passwordHash: 'password-hash',
        refreshTokenHash: 'refresh-token-hash',
    }, new domain_1.UniqueEntityId('user-1'));
    const repository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [user]),
        findByEmail: jest.fn(async (_email) => user),
        findById: jest.fn(async (_id) => user),
        update: jest.fn(async (_id, entity) => entity),
    };
    const passwordHasher = {
        hash: jest.fn(async (value) => `hash:${value}`),
        verify: jest.fn(async (_value, _hash) => true),
    };
    const tokenService = {
        createAccessToken: jest.fn(async (_payload) => 'access-token'),
        createRefreshToken: jest.fn(async (_payload) => 'refresh-token'),
        verifyRefreshToken: jest.fn(async (_token) => ({
            email: 'fan@example.com',
            role: domain_1.UserRole.USER,
            sub: 'user-1',
            tokenType: 'refresh',
        })),
    };
    const service = new authentication_application_service_1.AuthenticationApplicationService(repository, passwordHasher, tokenService);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('validates credentials, creates both tokens, and persists only a refresh-token hash', async () => {
        await expect(service.login({ email: 'fan@example.com', password: 'a-strong-password' })).resolves.toEqual({
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
        });
        expect(passwordHasher.verify).toHaveBeenCalledWith('a-strong-password', 'password-hash');
        expect(repository.update).toHaveBeenCalledWith(new domain_1.UniqueEntityId('user-1'), expect.objectContaining({ refreshTokenHash: 'hash:refresh-token' }));
    });
    it('rejects users without a migrated password without issuing tokens', async () => {
        repository.findByEmail.mockResolvedValueOnce(new domain_1.User({ email: new domain_1.Email('fan@example.com') }, new domain_1.UniqueEntityId('user-1')));
        await expect(service.login({ email: 'fan@example.com', password: 'a-strong-password' })).rejects.toBeInstanceOf(invalid_credentials_exception_1.InvalidCredentialsException);
        expect(tokenService.createAccessToken).not.toHaveBeenCalled();
    });
    it('rotates a verified refresh token and rejects an invalid refresh token', async () => {
        await expect(service.refresh('refresh-token')).resolves.toEqual({
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
        });
        passwordHasher.verify.mockResolvedValueOnce(false);
        await expect(service.refresh('refresh-token')).rejects.toBeInstanceOf(invalid_refresh_token_exception_1.InvalidRefreshTokenException);
    });
    it('removes the stored refresh-token hash on logout', async () => {
        await expect(service.logout('refresh-token')).resolves.toBeUndefined();
        expect(repository.update).toHaveBeenCalledWith(new domain_1.UniqueEntityId('user-1'), expect.objectContaining({ refreshTokenHash: undefined }));
    });
});
//# sourceMappingURL=authentication-application.service.spec.js.map