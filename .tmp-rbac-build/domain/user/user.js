"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const aggregate_root_1 = require("../aggregate-root/aggregate-root");
const user_role_1 = require("./user-role");
class User extends aggregate_root_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get passwordHash() {
        return this.props.passwordHash;
    }
    get refreshTokenHash() {
        return this.props.refreshTokenHash;
    }
    get role() {
        return this.props.role ?? user_role_1.UserRole.USER;
    }
    toJSON() {
        return Object.freeze({ email: this.props.email, id: this.id.toString() });
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map