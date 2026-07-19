import { ValueObject } from './value-object';
interface OperatingHoursProps {
    opensAt: string;
    closesAt: string;
}
export declare class OperatingHours extends ValueObject<OperatingHoursProps> {
    constructor(opensAt: string, closesAt: string);
    get opensAt(): string;
    get closesAt(): string;
    protected validate(props: Readonly<OperatingHoursProps>): void;
}
export {};
