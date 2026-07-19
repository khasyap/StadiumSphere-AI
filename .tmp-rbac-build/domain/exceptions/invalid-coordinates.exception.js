"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCoordinatesException = void 0;
const domain_validation_exception_1 = require("./domain-validation.exception");
class InvalidCoordinatesException extends domain_validation_exception_1.DomainValidationException {
    constructor() {
        super('Coordinates must contain valid latitude and longitude values.');
    }
}
exports.InvalidCoordinatesException = InvalidCoordinatesException;
//# sourceMappingURL=invalid-coordinates.exception.js.map