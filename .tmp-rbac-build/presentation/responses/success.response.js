"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    message;
    data;
    success = true;
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=success.response.js.map