"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const aggregate_root_1 = require("../aggregate-root/aggregate-root");
const unique_entity_id_1 = require("../identifier/unique-entity-id");
const booking_status_1 = require("./booking-status");
class Booking extends aggregate_root_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get eventId() {
        return new unique_entity_id_1.UniqueEntityId(this.props.eventId);
    }
    get status() {
        return this.props.status ?? booking_status_1.BookingStatus.PENDING;
    }
}
exports.Booking = Booking;
//# sourceMappingURL=booking.js.map