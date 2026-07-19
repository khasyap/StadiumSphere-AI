"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const invalid_capacity_exception_1 = require("./invalid-capacity.exception");
const invalid_coordinates_exception_1 = require("./invalid-coordinates.exception");
const invalid_email_exception_1 = require("./invalid-email.exception");
const invalid_money_exception_1 = require("./invalid-money.exception");
const invalid_time_slot_exception_1 = require("./invalid-time-slot.exception");
describe('domain validation exceptions', () => {
    it.each([
        new invalid_email_exception_1.InvalidEmailException(),
        new invalid_money_exception_1.InvalidMoneyException(),
        new invalid_capacity_exception_1.InvalidCapacityException(),
        new invalid_coordinates_exception_1.InvalidCoordinatesException(),
        new invalid_time_slot_exception_1.InvalidTimeSlotException(),
    ])('maps %p to a bad request response', (exception) => {
        expect(exception.getStatus()).toBe(common_1.HttpStatus.BAD_REQUEST);
    });
});
//# sourceMappingURL=domain-exceptions.spec.js.map