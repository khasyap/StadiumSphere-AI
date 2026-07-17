import { DomainValidationException } from '../exceptions/domain-validation.exception';
import { ValueObject } from './value-object';

export interface AddressProps {
  line1: string;
  city: string;
  country: string;
  postalCode: string;
}

export class Address extends ValueObject<AddressProps> {
  public constructor(props: AddressProps) {
    super({
      line1: props.line1.trim(),
      city: props.city.trim(),
      country: props.country.trim(),
      postalCode: props.postalCode.trim(),
    });
  }

  protected validate(props: Readonly<AddressProps>): void {
    if (Object.values(props).some((value) => value.length === 0)) {
      throw new DomainValidationException('Address fields must not be empty.');
    }
  }
}
