import { DomainValidationException } from '../exceptions/domain-validation.exception';
import { ValueObject } from './value-object';

interface PhoneNumberProps {
  value: string;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  public constructor(value: string) {
    super({ value: value.replace(/\s/g, '') });
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate(props: Readonly<PhoneNumberProps>): void {
    if (!/^\+[1-9]\d{6,14}$/.test(props.value)) {
      throw new DomainValidationException('Phone number must be a valid E.164 value.');
    }
  }
}
