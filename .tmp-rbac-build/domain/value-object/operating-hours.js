"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatingHours = void 0;
const domain_validation_exception_1 = require("../exceptions/domain-validation.exception");
const value_object_1 = require("./value-object");
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
class OperatingHours extends value_object_1.ValueObject {
    constructor(opensAt, closesAt) {
        super({ opensAt, closesAt });
    }
    get opensAt() {
        return this.props.opensAt;
    }
    get closesAt() {
        return this.props.closesAt;
    }
    validate(props) {
        if (!timePattern.test(props.opensAt) || !timePattern.test(props.closesAt)) {
            throw new domain_validation_exception_1.DomainValidationException('Operating hours must use HH:mm format.');
        }
        const toMinutes = (time) => {
            const hours = Number(time.slice(0, 2));
            const minutes = Number(time.slice(3, 5));
            return hours * 60 + minutes;
        };
        if (toMinutes(props.opensAt) >= toMinutes(props.closesAt)) {
            throw new domain_validation_exception_1.DomainValidationException('Opening time must be before closing time.');
        }
    }
}
exports.OperatingHours = OperatingHours;
//# sourceMappingURL=operating-hours.js.map