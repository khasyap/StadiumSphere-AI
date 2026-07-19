"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsException = void 0;
const common_1 = require("@nestjs/common");
const application_exception_1 = require("./application.exception");
class InvalidCredentialsException extends application_exception_1.ApplicationException {
    constructor() {
        super('Invalid credentials.', 'AUTHENTICATION_INVALID_CREDENTIALS', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
//# sourceMappingURL=invalid-credentials.exception.js.map