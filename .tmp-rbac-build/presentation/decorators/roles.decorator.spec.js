"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const roles_decorator_1 = require("./roles.decorator");
describe('Roles', () => {
    it('stores the required roles as route metadata', () => {
        class ProtectedResource {
        }
        (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER)(ProtectedResource);
        expect(Reflect.getMetadata(roles_decorator_1.ROLES_KEY, ProtectedResource)).toEqual([
            domain_1.UserRole.ADMIN,
            domain_1.UserRole.MANAGER,
        ]);
    });
});
//# sourceMappingURL=roles.decorator.spec.js.map