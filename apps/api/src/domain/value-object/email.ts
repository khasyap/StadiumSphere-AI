import { InvalidEmailException } from '../exceptions/invalid-email.exception';
import { ValueObject } from './value-object';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  public constructor(value: string) {
    super({ value: value.trim().toLowerCase() });
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate(props: Readonly<EmailProps>): void {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.value)) {
      throw new InvalidEmailException();
    }
  }
}
