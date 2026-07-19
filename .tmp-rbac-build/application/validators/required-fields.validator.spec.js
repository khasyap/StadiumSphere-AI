"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_validation_exception_1 = require("../exceptions/application-validation.exception");
const required_fields_validator_1 = require("./required-fields.validator");
describe('RequiredFieldsValidator', () => {
    const validator = new required_fields_validator_1.RequiredFieldsValidator(['name']);
    it('accepts required populated values', () => {
        expect(() => validator.validate({ name: 'Stadium' })).not.toThrow();
    });
    it('rejects missing or blank required values', () => {
        expect(() => validator.validate({ name: ' ' })).toThrow(application_validation_exception_1.ApplicationValidationException);
    });
});
//# sourceMappingURL=required-fields.validator.spec.js.map