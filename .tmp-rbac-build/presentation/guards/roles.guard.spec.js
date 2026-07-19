"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const roles_guard_1 = require("./roles.guard");
describe('RolesGuard', () => {
    const reflector = {
        getAllAndOverride: jest.fn(),
    };
    const guard = new roles_guard_1.RolesGuard(reflector);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('allows a user whose JWT role is required by the route', () => {
        reflector.getAllAndOverride.mockReturnValue([domain_1.UserRole.ADMIN]);
        expect(guard.canActivate(createContext(domain_1.UserRole.ADMIN))).toBe(true);
    });
    it('rejects an authenticated user without the required role', () => {
        reflector.getAllAndOverride.mockReturnValue([domain_1.UserRole.ADMIN]);
        expect(() => guard.canActivate(createContext(domain_1.UserRole.USER))).toThrow(common_1.ForbiddenException);
    });
    it('allows routes without role metadata after authentication has completed', () => {
        reflector.getAllAndOverride.mockReturnValue(undefined);
        expect(guard.canActivate(createContext(domain_1.UserRole.USER))).toBe(true);
    });
    function createContext(role) {
        return {
            getClass: jest.fn(),
            getHandler: jest.fn(),
            switchToHttp: () => ({
                getRequest: () => ({ user: { email: 'fan@example.com', role, sub: 'user-1' } }),
            }),
        };
    }
});
//# sourceMappingURL=roles.guard.spec.js.map