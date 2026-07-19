import { ValueObject } from './value-object';
export interface CoordinatesProps {
    latitude: number;
    longitude: number;
}
export declare class Coordinates extends ValueObject<CoordinatesProps> {
    constructor(latitude: number, longitude: number);
    get latitude(): number;
    get longitude(): number;
    protected validate(props: Readonly<CoordinatesProps>): void;
}
