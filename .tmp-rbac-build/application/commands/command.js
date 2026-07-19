"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    payload;
    constructor(payload) {
        this.payload = Object.freeze({ ...payload });
    }
}
exports.Command = Command;
//# sourceMappingURL=command.js.map