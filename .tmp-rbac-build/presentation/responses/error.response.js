"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse {
    correlationId;
    message;
    statusCode;
    timestamp;
    constructor(correlationId, message, statusCode, timestamp) {
        this.correlationId = correlationId;
        this.message = message;
        this.statusCode = statusCode;
        this.timestamp = timestamp;
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=error.response.js.map