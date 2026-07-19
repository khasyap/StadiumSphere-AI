"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationValidationException = void 0;
const common_1 = require("@nestjs/common");
const application_exception_1 = require("./application.exception");
class ApplicationValidationException extends application_exception_1.ApplicationException {
    constructor(message) {
        super(message, 'APPLICATION_VALIDATION_ERROR', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ApplicationValidationException = ApplicationValidationException;
//# sourceMappingURL=application-validation.exception.js.map