"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumber = void 0;
const domain_validation_exception_1 = require("../exceptions/domain-validation.exception");
const value_object_1 = require("./value-object");
class PhoneNumber extends value_object_1.ValueObject {
    constructor(value) {
        super({ value: value.replace(/\s/g, '') });
    }
    get value() {
        return this.props.value;
    }
    validate(props) {
        if (!/^\+[1-9]\d{6,14}$/.test(props.value)) {
            throw new domain_validation_exception_1.DomainValidationException('Phone number must be a valid E.164 value.');
        }
    }
}
exports.PhoneNumber = PhoneNumber;
//# sourceMappingURL=phone-number.js.map