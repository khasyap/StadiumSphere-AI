"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const aggregate_root_1 = require("../aggregate-root/aggregate-root");
class Organization extends aggregate_root_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
}
exports.Organization = Organization;
//# sourceMappingURL=organization.js.map