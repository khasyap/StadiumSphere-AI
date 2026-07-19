"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailException = void 0;
const domain_validation_exception_1 = require("./domain-validation.exception");
class InvalidEmailException extends domain_validation_exception_1.DomainValidationException {
    constructor() {
        super('Email must be a valid address.');
    }
}
exports.InvalidEmailException = InvalidEmailException;
//# sourceMappingURL=invalid-email.exception.js.map