"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTimeSlotException = void 0;
const domain_validation_exception_1 = require("./domain-validation.exception");
class InvalidTimeSlotException extends domain_validation_exception_1.DomainValidationException {
    constructor() {
        super('A time slot must start before it ends.');
    }
}
exports.InvalidTimeSlotException = InvalidTimeSlotException;
//# sourceMappingURL=invalid-time-slot.exception.js.map