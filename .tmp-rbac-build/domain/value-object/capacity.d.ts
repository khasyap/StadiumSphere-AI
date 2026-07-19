import { ValueObject } from './value-object';
interface CapacityProps {
    value: number;
}
export declare class Capacity extends ValueObject<CapacityProps> {
    constructor(value: number);
    get value(): number;
    protected validate(props: Readonly<CapacityProps>): void;
}
export {};
