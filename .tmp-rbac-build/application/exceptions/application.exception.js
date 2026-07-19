"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationException = void 0;
const common_1 = require("@nestjs/common");
class ApplicationException extends common_1.HttpException {
    code;
    constructor(message, code, statusCode) {
        super({ code, message }, statusCode);
        this.code = code;
        this.name = new.target.name;
    }
}
exports.ApplicationException = ApplicationException;
//# sourceMappingURL=application.exception.js.map