import { ValueObject } from './value-object';
interface PhoneNumberProps {
    value: string;
}
export declare class PhoneNumber extends ValueObject<PhoneNumberProps> {
    constructor(value: string);
    get value(): string;
    protected validate(props: Readonly<PhoneNumberProps>): void;
}
export {};
