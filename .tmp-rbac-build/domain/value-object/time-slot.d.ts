import { ValueObject } from './value-object';
interface TimeSlotProps {
    startsAt: Date;
    endsAt: Date;
}
export declare class TimeSlot extends ValueObject<TimeSlotProps> {
    constructor(startsAt: Date, endsAt: Date);
    get startsAt(): Date;
    get endsAt(): Date;
    protected validate(props: Readonly<TimeSlotProps>): void;
}
export {};
