"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidMoneyException = void 0;
const domain_validation_exception_1 = require("./domain-validation.exception");
class InvalidMoneyException extends domain_validation_exception_1.DomainValidationException {
    constructor() {
        super('Money must include a non-negative amount and a three-letter currency code.');
    }
}
exports.InvalidMoneyException = InvalidMoneyException;
//# sourceMappingURL=invalid-money.exception.js.map