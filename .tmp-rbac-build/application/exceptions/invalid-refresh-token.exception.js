"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRefreshTokenException = void 0;
const common_1 = require("@nestjs/common");
const application_exception_1 = require("./application.exception");
class InvalidRefreshTokenException extends application_exception_1.ApplicationException {
    constructor() {
        super('Invalid refresh token.', 'AUTHENTICATION_INVALID_REFRESH_TOKEN', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.InvalidRefreshTokenException = InvalidRefreshTokenException;
//# sourceMappingURL=invalid-refresh-token.exception.js.map