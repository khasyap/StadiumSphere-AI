import { DomainValidationException } from './domain-validation.exception';

export class InvalidEmailException extends DomainValidationException {
  public constructor() {
    super('Email must be a valid address.');
  }
}
