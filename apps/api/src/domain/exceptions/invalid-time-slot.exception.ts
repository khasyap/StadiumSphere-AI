import { DomainValidationException } from './domain-validation.exception';

export class InvalidTimeSlotException extends DomainValidationException {
  public constructor() {
    super('A time slot must start before it ends.');
  }
}
