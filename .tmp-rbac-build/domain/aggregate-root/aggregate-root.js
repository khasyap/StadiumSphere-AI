"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const entity_1 = require("../entity/entity");
class AggregateRoot extends entity_1.Entity {
    domainEvents = [];
    constructor(props, id) {
        super(props, id);
    }
    addDomainEvent(event) {
        this.domainEvents.push(event);
    }
    clearDomainEvents() {
        this.domainEvents.splice(0, this.domainEvents.length);
    }
    getDomainEvents() {
        return [...this.domainEvents];
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=aggregate-root.js.map