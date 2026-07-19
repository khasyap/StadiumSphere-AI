"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedResponse = void 0;
const success_response_1 = require("./success.response");
class PagedResponse extends success_response_1.SuccessResponse {
    page;
    limit;
    total;
    constructor(message, data, page, limit, total) {
        super(message, data);
        this.page = page;
        this.limit = limit;
        this.total = total;
    }
}
exports.PagedResponse = PagedResponse;
//# sourceMappingURL=paged.response.js.map