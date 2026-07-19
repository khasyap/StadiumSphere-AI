"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainValidationException = void 0;
const common_1 = require("@nestjs/common");
class DomainValidationException extends common_1.BadRequestException {
    constructor(message) {
        super(message);
    }
}
exports.DomainValidationException = DomainValidationException;
//# sourceMappingURL=domain-validation.exception.js.map