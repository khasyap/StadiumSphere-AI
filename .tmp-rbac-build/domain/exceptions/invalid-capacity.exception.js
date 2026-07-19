"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCapacityException = void 0;
const domain_validation_exception_1 = require("./domain-validation.exception");
class InvalidCapacityException extends domain_validation_exception_1.DomainValidationException {
    constructor() {
        super('Capacity must be a positive whole number.');
    }
}
exports.InvalidCapacityException = InvalidCapacityException;
//# sourceMappingURL=invalid-capacity.exception.js.map