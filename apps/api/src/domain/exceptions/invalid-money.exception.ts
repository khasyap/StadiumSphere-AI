import { DomainValidationException } from './domain-validation.exception';

export class InvalidMoneyException extends DomainValidationException {
  public constructor() {
    super('Money must include a non-negative amount and a three-letter currency code.');
  }
}
