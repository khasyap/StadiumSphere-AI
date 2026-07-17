import { DomainValidationException } from '../exceptions/domain-validation.exception';
import { ValueObject } from './value-object';

interface OperatingHoursProps {
  opensAt: string;
  closesAt: string;
}

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export class OperatingHours extends ValueObject<OperatingHoursProps> {
  public constructor(opensAt: string, closesAt: string) {
    super({ opensAt, closesAt });
  }

  public get opensAt(): string {
    return this.props.opensAt;
  }

  public get closesAt(): string {
    return this.props.closesAt;
  }

  protected validate(props: Readonly<OperatingHoursProps>): void {
    if (!timePattern.test(props.opensAt) || !timePattern.test(props.closesAt)) {
      throw new DomainValidationException('Operating hours must use HH:mm format.');
    }

    const toMinutes = (time: string): number => {
      const hours = Number(time.slice(0, 2));
      const minutes = Number(time.slice(3, 5));
      return hours * 60 + minutes;
    };

    if (toMinutes(props.opensAt) >= toMinutes(props.closesAt)) {
      throw new DomainValidationException('Opening time must be before closing time.');
    }
  }
}
