import { HttpStatus } from '@nestjs/common';

import { InvalidCapacityException } from './invalid-capacity.exception';
import { InvalidCoordinatesException } from './invalid-coordinates.exception';
import { InvalidEmailException } from './invalid-email.exception';
import { InvalidMoneyException } from './invalid-money.exception';
import { InvalidTimeSlotException } from './invalid-time-slot.exception';

describe('domain validation exceptions', () => {
  it.each([
    new InvalidEmailException(),
    new InvalidMoneyException(),
    new InvalidCapacityException(),
    new InvalidCoordinatesException(),
    new InvalidTimeSlotException(),
  ])('maps %p to a bad request response', (exception) => {
    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
  });
});
