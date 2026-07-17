import { InvalidTimeSlotException } from '../exceptions/invalid-time-slot.exception';
import { ValueObject } from './value-object';

interface TimeSlotProps {
  startsAt: Date;
  endsAt: Date;
}

export class TimeSlot extends ValueObject<TimeSlotProps> {
  public constructor(startsAt: Date, endsAt: Date) {
    super({ startsAt: new Date(startsAt), endsAt: new Date(endsAt) });
  }

  public get startsAt(): Date {
    return new Date(this.props.startsAt);
  }

  public get endsAt(): Date {
    return new Date(this.props.endsAt);
  }

  protected validate(props: Readonly<TimeSlotProps>): void {
    if (
      Number.isNaN(props.startsAt.getTime()) ||
      Number.isNaN(props.endsAt.getTime()) ||
      props.startsAt >= props.endsAt
    ) {
      throw new InvalidTimeSlotException();
    }
  }
}
