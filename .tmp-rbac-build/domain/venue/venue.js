"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venue = void 0;
const aggregate_root_1 = require("../aggregate-root/aggregate-root");
class Venue extends aggregate_root_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
}
exports.Venue = Venue;
//# sourceMappingURL=venue.js.map