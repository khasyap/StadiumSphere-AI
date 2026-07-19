import { ValueObject } from './value-object';
export interface AddressProps {
    line1: string;
    city: string;
    country: string;
    postalCode: string;
}
export declare class Address extends ValueObject<AddressProps> {
    constructor(props: AddressProps);
    protected validate(props: Readonly<AddressProps>): void;
}
