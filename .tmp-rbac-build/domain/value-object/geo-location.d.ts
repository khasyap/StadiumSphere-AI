import type { Address } from './address';
import type { Coordinates } from './coordinates';
import { ValueObject } from './value-object';
interface GeoLocationProps {
    coordinates: Coordinates;
    address?: Address;
}
export declare class GeoLocation extends ValueObject<GeoLocationProps> {
    constructor(coordinates: Coordinates, address?: Address);
    get coordinates(): Coordinates;
    get address(): Address | undefined;
    protected validate(_props: Readonly<GeoLocationProps>): void;
}
export {};
