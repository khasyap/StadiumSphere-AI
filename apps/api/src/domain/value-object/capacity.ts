import { InvalidCapacityException } from '../exceptions/invalid-capacity.exception';
import { ValueObject } from './value-object';

interface CapacityProps {
  value: number;
}

export class Capacity extends ValueObject<CapacityProps> {
  public constructor(value: number) {
    super({ value });
  }

  public get value(): number {
    return this.props.value;
  }

  protected validate(props: Readonly<CapacityProps>): void {
    if (!Number.isInteger(props.value) || props.value <= 0) {
      throw new InvalidCapacityException();
    }
  }
}
