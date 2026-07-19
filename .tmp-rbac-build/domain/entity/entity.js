"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const unique_entity_id_1 = require("../identifier/unique-entity-id");
class Entity {
    props;
    id;
    constructor(props, id) {
        this.props = props;
        this.id = id ?? new unique_entity_id_1.UniqueEntityId();
    }
    equals(entity) {
        return entity !== undefined && this.id.equals(entity.id);
    }
    toJSON() {
        return Object.freeze({ ...this.props, id: this.id.toString() });
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map