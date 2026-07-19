"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const invalid_email_exception_1 = require("../exceptions/invalid-email.exception");
const value_object_1 = require("./value-object");
class Email extends value_object_1.ValueObject {
    constructor(value) {
        super({ value: value.trim().toLowerCase() });
    }
    get value() {
        return this.props.value;
    }
    validate(props) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.value)) {
            throw new invalid_email_exception_1.InvalidEmailException();
        }
    }
}
exports.Email = Email;
//# sourceMappingURL=email.js.map