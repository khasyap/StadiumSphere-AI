"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityId = void 0;
const node_crypto_1 = require("node:crypto");
const identifier_1 = require("./identifier");
class UniqueEntityId extends identifier_1.Identifier {
    constructor(value = (0, node_crypto_1.randomUUID)()) {
        if (value.trim().length === 0) {
            throw new TypeError('A unique entity identifier cannot be empty.');
        }
        super(value);
    }
}
exports.UniqueEntityId = UniqueEntityId;
//# sourceMappingURL=unique-entity-id.js.map