"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stadium = void 0;
const aggregate_root_1 = require("../aggregate-root/aggregate-root");
class Stadium extends aggregate_root_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
}
exports.Stadium = Stadium;
//# sourceMappingURL=stadium.js.map