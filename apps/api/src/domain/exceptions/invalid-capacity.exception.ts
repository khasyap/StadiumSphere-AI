import { DomainValidationException } from './domain-validation.exception';

export class InvalidCapacityException extends DomainValidationException {
  public constructor() {
    super('Capacity must be a positive whole number.');
  }
}
