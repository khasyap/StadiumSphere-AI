import { DomainValidationException } from './domain-validation.exception';

export class InvalidCoordinatesException extends DomainValidationException {
  public constructor() {
    super('Coordinates must contain valid latitude and longitude values.');
  }
}
