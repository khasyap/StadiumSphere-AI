import { ValueObject } from './value-object';
interface MoneyProps {
    amount: number;
    currency: string;
}
export declare class Money extends ValueObject<MoneyProps> {
    constructor(amount: number, currency: string);
    get amount(): number;
    get currency(): string;
    protected validate(props: Readonly<MoneyProps>): void;
}
export {};
