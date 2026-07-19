"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_capacity_exception_1 = require("../exceptions/invalid-capacity.exception");
const invalid_coordinates_exception_1 = require("../exceptions/invalid-coordinates.exception");
const invalid_email_exception_1 = require("../exceptions/invalid-email.exception");
const invalid_money_exception_1 = require("../exceptions/invalid-money.exception");
const invalid_time_slot_exception_1 = require("../exceptions/invalid-time-slot.exception");
const address_1 = require("./address");
const capacity_1 = require("./capacity");
const coordinates_1 = require("./coordinates");
const email_1 = require("./email");
const geo_location_1 = require("./geo-location");
const money_1 = require("./money");
const operating_hours_1 = require("./operating-hours");
const phone_number_1 = require("./phone-number");
const time_slot_1 = require("./time-slot");
describe('value objects', () => {
    it('normalizes and compares email addresses', () => {
        expect(new email_1.Email(' USER@example.com ').equals(new email_1.Email('user@example.com'))).toBe(true);
        expect(() => new email_1.Email('not-an-email')).toThrow(invalid_email_exception_1.InvalidEmailException);
    });
    it('validates money, capacity, coordinates, and time slots', () => {
        expect(new money_1.Money(12.5, 'usd').toJSON()).toEqual({ amount: 12.5, currency: 'USD' });
        expect(() => new money_1.Money(-1, 'USD')).toThrow(invalid_money_exception_1.InvalidMoneyException);
        expect(() => new capacity_1.Capacity(0)).toThrow(invalid_capacity_exception_1.InvalidCapacityException);
        expect(() => new coordinates_1.Coordinates(91, 0)).toThrow(invalid_coordinates_exception_1.InvalidCoordinatesException);
        expect(() => new time_slot_1.TimeSlot(new Date('2026-01-02'), new Date('2026-01-01'))).toThrow(invalid_time_slot_exception_1.InvalidTimeSlotException);
    });
    it('accepts valid contact, location, and operating-hours values', () => {
        const address = new address_1.Address({
            line1: '1 Stadium Way',
            city: 'Chennai',
            country: 'India',
            postalCode: '600001',
        });
        expect(new phone_number_1.PhoneNumber('+1 415 555 2671').value).toBe('+14155552671');
        expect(new geo_location_1.GeoLocation(new coordinates_1.Coordinates(13.0827, 80.2707), address).coordinates.latitude).toBe(13.0827);
        expect(new operating_hours_1.OperatingHours('09:00', '18:00').toJSON()).toEqual({
            opensAt: '09:00',
            closesAt: '18:00',
        });
    });
});
//# sourceMappingURL=value-objects.spec.js.map