"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_authentication_guard_1 = require("./jwt-authentication.guard");
describe('JwtAuthenticationGuard', () => {
    it('is registered as the JWT Passport guard', () => {
        expect(jwt_authentication_guard_1.JwtAuthenticationGuard).toBeDefined();
    });
});
//# sourceMappingURL=jwt-authentication.guard.spec.js.map