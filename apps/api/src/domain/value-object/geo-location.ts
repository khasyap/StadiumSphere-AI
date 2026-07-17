import type { Address } from './address';
import type { Coordinates } from './coordinates';
import { ValueObject } from './value-object';

interface GeoLocationProps {
  coordinates: Coordinates;
  address?: Address;
}

export class GeoLocation extends ValueObject<GeoLocationProps> {
  public constructor(coordinates: Coordinates, address?: Address) {
    super(address === undefined ? { coordinates } : { coordinates, address });
  }

  public get coordinates(): Coordinates {
    return this.props.coordinates;
  }

  public get address(): Address | undefined {
    return this.props.address;
  }

  protected validate(_props: Readonly<GeoLocationProps>): void {}
}
