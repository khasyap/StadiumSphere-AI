"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlot = void 0;
const invalid_time_slot_exception_1 = require("../exceptions/invalid-time-slot.exception");
const value_object_1 = require("./value-object");
class TimeSlot extends value_object_1.ValueObject {
    constructor(startsAt, endsAt) {
        super({ startsAt: new Date(startsAt), endsAt: new Date(endsAt) });
    }
    get startsAt() {
        return new Date(this.props.startsAt);
    }
    get endsAt() {
        return new Date(this.props.endsAt);
    }
    validate(props) {
        if (Number.isNaN(props.startsAt.getTime()) ||
            Number.isNaN(props.endsAt.getTime()) ||
            props.startsAt >= props.endsAt) {
            throw new invalid_time_slot_exception_1.InvalidTimeSlotException();
        }
    }
}
exports.TimeSlot = TimeSlot;
//# sourceMappingURL=time-slot.js.map