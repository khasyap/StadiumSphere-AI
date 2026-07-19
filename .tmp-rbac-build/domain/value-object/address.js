"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const domain_validation_exception_1 = require("../exceptions/domain-validation.exception");
const value_object_1 = require("./value-object");
class Address extends value_object_1.ValueObject {
    constructor(props) {
        super({
            line1: props.line1.trim(),
            city: props.city.trim(),
            country: props.country.trim(),
            postalCode: props.postalCode.trim(),
        });
    }
    validate(props) {
        if (Object.values(props).some((value) => value.length === 0)) {
            throw new domain_validation_exception_1.DomainValidationException('Address fields must not be empty.');
        }
    }
}
exports.Address = Address;
//# sourceMappingURL=address.js.map