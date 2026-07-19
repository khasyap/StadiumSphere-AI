"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredFieldsValidator = void 0;
const application_validation_exception_1 = require("../exceptions/application-validation.exception");
class RequiredFieldsValidator {
    fields;
    constructor(fields) {
        this.fields = fields;
    }
    validate(value) {
        for (const field of this.fields) {
            const candidate = value[field];
            if (candidate === undefined ||
                candidate === null ||
                (typeof candidate === 'string' && candidate.trim().length === 0)) {
                throw new application_validation_exception_1.ApplicationValidationException(`Field "${String(field)}" is required.`);
            }
        }
    }
}
exports.RequiredFieldsValidator = RequiredFieldsValidator;
//# sourceMappingURL=required-fields.validator.js.map