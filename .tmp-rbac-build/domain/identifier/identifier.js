"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = void 0;
class Identifier {
    value;
    constructor(value) {
        this.value = value;
    }
    equals(identifier) {
        return identifier !== undefined && this.value === identifier.value;
    }
    toString() {
        return this.value;
    }
}
exports.Identifier = Identifier;
//# sourceMappingURL=identifier.js.map