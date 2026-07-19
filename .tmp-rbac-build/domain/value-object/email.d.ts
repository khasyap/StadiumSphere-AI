import { ValueObject } from './value-object';
interface EmailProps {
    value: string;
}
export declare class Email extends ValueObject<EmailProps> {
    constructor(value: string);
    get value(): string;
    protected validate(props: Readonly<EmailProps>): void;
}
export {};
