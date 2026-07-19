"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const application_entity_not_found_exception_1 = require("../../application/exceptions/application-entity-not-found.exception");
const application_validation_exception_1 = require("../../application/exceptions/application-validation.exception");
const global_exception_filter_1 = require("./global-exception.filter");
const createHost = (response) => ({
    switchToHttp: () => ({
        getRequest: () => ({ correlationId: 'correlation-1' }),
        getResponse: () => response,
    }),
});
describe('GlobalExceptionFilter', () => {
    it('maps application validation failures to HTTP 400', () => {
        const response = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
        new global_exception_filter_1.GlobalExceptionFilter().catch(new application_validation_exception_1.ApplicationValidationException('Referenced Sport is invalid.'), createHost(response));
        expect(response.status).toHaveBeenCalledWith(common_1.HttpStatus.BAD_REQUEST);
        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
            correlationId: 'correlation-1',
            message: 'Referenced Sport is invalid.',
            statusCode: common_1.HttpStatus.BAD_REQUEST,
        }));
    });
    it('maps application not-found failures to HTTP 404', () => {
        const response = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
        new global_exception_filter_1.GlobalExceptionFilter().catch(new application_entity_not_found_exception_1.ApplicationEntityNotFoundException('sport-1'), createHost(response));
        expect(response.status).toHaveBeenCalledWith(common_1.HttpStatus.NOT_FOUND);
        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Entity with identifier "sport-1" was not found.',
            statusCode: common_1.HttpStatus.NOT_FOUND,
        }));
    });
});
//# sourceMappingURL=global-exception.filter.spec.js.map