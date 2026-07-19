"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const aggregate_root_1 = require("../aggregate-root/aggregate-root");
const event_status_1 = require("./event-status");
class Event extends aggregate_root_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get status() {
        return this.props.status ?? event_status_1.EventStatus.SCHEDULED;
    }
    toJSON() {
        return Object.freeze({
            id: this.id.toString(),
            name: this.props.name,
            status: this.status,
            timeSlot: this.props.timeSlot,
        });
    }
}
exports.Event = Event;
//# sourceMappingURL=event.js.map