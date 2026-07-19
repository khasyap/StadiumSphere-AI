"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationEntityNotFoundException = void 0;
const common_1 = require("@nestjs/common");
const application_exception_1 = require("./application.exception");
class ApplicationEntityNotFoundException extends application_exception_1.ApplicationException {
    constructor(id) {
        super(`Entity with identifier "${id}" was not found.`, 'APPLICATION_ENTITY_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.ApplicationEntityNotFoundException = ApplicationEntityNotFoundException;
//# sourceMappingURL=application-entity-not-found.exception.js.map