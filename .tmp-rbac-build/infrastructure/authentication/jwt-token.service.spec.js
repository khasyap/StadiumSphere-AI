"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@nestjs/jwt");
const domain_1 = require("../../domain");
const jwt_token_service_1 = require("./jwt-token.service");
describe('JwtTokenService', () => {
    const configuration = {
        getOrThrow: jest.fn((key) => ({
            JWT_ACCESS_EXPIRES_IN: 900,
            JWT_ACCESS_SECRET: 'a-very-long-local-access-secret-that-is-at-least-32-characters',
            JWT_REFRESH_EXPIRES_IN: 604800,
            JWT_REFRESH_SECRET: 'a-very-long-local-refresh-secret-that-is-at-least-32-characters',
        })[key]),
    };
    const service = new jwt_token_service_1.JwtTokenService(configuration, new jwt_1.JwtService());
    it('issues independent access and refresh tokens and verifies only refresh tokens', async () => {
        const payload = { email: 'fan@example.com', role: domain_1.UserRole.ADMIN, sub: 'user-1' };
        const accessToken = await service.createAccessToken(payload);
        const refreshToken = await service.createRefreshToken(payload);
        await expect(service.verifyRefreshToken(refreshToken)).resolves.toMatchObject({
            ...payload,
            tokenType: 'refresh',
        });
        await expect(service.verifyRefreshToken(accessToken)).rejects.toThrow();
    });
});
//# sourceMappingURL=jwt-token.service.spec.js.map