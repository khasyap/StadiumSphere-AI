"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceException = void 0;
const common_1 = require("@nestjs/common");
class PersistenceException extends common_1.InternalServerErrorException {
    constructor(message = 'A persistence operation failed.') {
        super(message);
    }
}
exports.PersistenceException = PersistenceException;
//# sourceMappingURL=persistence.exception.js.map