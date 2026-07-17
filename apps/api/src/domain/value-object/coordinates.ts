import { InvalidCoordinatesException } from '../exceptions/invalid-coordinates.exception';
import { ValueObject } from './value-object';

export interface CoordinatesProps {
  latitude: number;
  longitude: number;
}

export class Coordinates extends ValueObject<CoordinatesProps> {
  public constructor(latitude: number, longitude: number) {
    super({ latitude, longitude });
  }

  public get latitude(): number {
    return this.props.latitude;
  }

  public get longitude(): number {
    return this.props.longitude;
  }

  protected validate(props: Readonly<CoordinatesProps>): void {
    if (
      !Number.isFinite(props.latitude) ||
      !Number.isFinite(props.longitude) ||
      props.latitude < -90 ||
      props.latitude > 90 ||
      props.longitude < -180 ||
      props.longitude > 180
    ) {
      throw new InvalidCoordinatesException();
    }
  }
}
