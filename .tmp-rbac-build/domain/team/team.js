"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const aggregate_root_1 = require("../aggregate-root/aggregate-root");
class Team extends aggregate_root_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
}
exports.Team = Team;
//# sourceMappingURL=team.js.map