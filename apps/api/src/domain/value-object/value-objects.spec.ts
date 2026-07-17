import { InvalidCapacityException } from '../exceptions/invalid-capacity.exception';
import { InvalidCoordinatesException } from '../exceptions/invalid-coordinates.exception';
import { InvalidEmailException } from '../exceptions/invalid-email.exception';
import { InvalidMoneyException } from '../exceptions/invalid-money.exception';
import { InvalidTimeSlotException } from '../exceptions/invalid-time-slot.exception';
import { Address } from './address';
import { Capacity } from './capacity';
import { Coordinates } from './coordinates';
import { Email } from './email';
import { GeoLocation } from './geo-location';
import { Money } from './money';
import { OperatingHours } from './operating-hours';
import { PhoneNumber } from './phone-number';
import { TimeSlot } from './time-slot';

describe('value objects', () => {
  it('normalizes and compares email addresses', () => {
    expect(new Email(' USER@example.com ').equals(new Email('user@example.com'))).toBe(true);
    expect(() => new Email('not-an-email')).toThrow(InvalidEmailException);
  });

  it('validates money, capacity, coordinates, and time slots', () => {
    expect(new Money(12.5, 'usd').toJSON()).toEqual({ amount: 12.5, currency: 'USD' });
    expect(() => new Money(-1, 'USD')).toThrow(InvalidMoneyException);
    expect(() => new Capacity(0)).toThrow(InvalidCapacityException);
    expect(() => new Coordinates(91, 0)).toThrow(InvalidCoordinatesException);
    expect(() => new TimeSlot(new Date('2026-01-02'), new Date('2026-01-01'))).toThrow(
      InvalidTimeSlotException,
    );
  });

  it('accepts valid contact, location, and operating-hours values', () => {
    const address = new Address({
      line1: '1 Stadium Way',
      city: 'Chennai',
      country: 'India',
      postalCode: '600001',
    });

    expect(new PhoneNumber('+1 415 555 2671').value).toBe('+14155552671');
    expect(new GeoLocation(new Coordinates(13.0827, 80.2707), address).coordinates.latitude).toBe(
      13.0827,
    );
    expect(new OperatingHours('09:00', '18:00').toJSON()).toEqual({
      opensAt: '09:00',
      closesAt: '18:00',
    });
  });
});
