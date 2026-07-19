"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateEntityException = void 0;
const common_1 = require("@nestjs/common");
class DuplicateEntityException extends common_1.ConflictException {
    constructor(entityName) {
        super(`${entityName} already exists.`);
    }
}
exports.DuplicateEntityException = DuplicateEntityException;
//# sourceMappingURL=duplicate-entity.exception.js.map