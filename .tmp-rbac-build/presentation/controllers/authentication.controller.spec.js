"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_controller_1 = require("./authentication.controller");
describe('AuthenticationController', () => {
    const service = {
        login: jest.fn(async (_command) => ({
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
        })),
        logout: jest.fn(async (_refreshToken) => undefined),
        refresh: jest.fn(async (_refreshToken) => ({
            accessToken: 'access-token',
            refreshToken: 'rotated-refresh-token',
        })),
    };
    const controller = new authentication_controller_1.AuthenticationController(service);
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
//# sourceMappingURL=authentication.controller.spec.js.map