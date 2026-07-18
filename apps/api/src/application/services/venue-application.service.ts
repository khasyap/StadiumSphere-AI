import { Inject, Injectable } from '@nestjs/common';

import { Address, Coordinates, GeoLocation, Venue } from '../../domain';
import type { VenueRepositoryPort } from '../interfaces/application-repository.interface';
import { VENUE_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';

interface VenueAddressCommand {
  addressLine1?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface VenueCreateCommand extends VenueAddressCommand {
  latitude: number;
  longitude: number;
  name: string;
}

export interface VenueUpdateCommand {
  latitude?: number;
  longitude?: number;
  name?: string;
}

@Injectable()
export class VenueApplicationService extends CrudApplicationService<
  Venue,
  VenueCreateCommand,
  VenueUpdateCommand
> {
  public constructor(@Inject(VENUE_REPOSITORY) repository: VenueRepositoryPort) {
    super(repository);
  }

  protected createEntity(command: VenueCreateCommand): Venue {
    return new Venue({ location: this.createLocation(command), name: command.name });
  }

  protected updateEntity(current: Venue, command: VenueUpdateCommand): Venue {
    const venue = current.toJSON();
    const coordinates = venue.location.coordinates;

    return new Venue(
      {
        location: new GeoLocation(
          new Coordinates(
            command.latitude ?? coordinates.latitude,
            command.longitude ?? coordinates.longitude,
          ),
          venue.location.address,
        ),
        name: command.name ?? venue.name,
      },
      current.id,
    );
  }

  private createLocation(command: VenueCreateCommand): GeoLocation {
    const coordinates = new Coordinates(command.latitude, command.longitude);
    const address = this.createAddress(command);

    return address === undefined
      ? new GeoLocation(coordinates)
      : new GeoLocation(coordinates, address);
  }

  private createAddress(command: VenueAddressCommand): Address | undefined {
    const { addressLine1, city, country, postalCode } = command;

    if (
      addressLine1 === undefined &&
      city === undefined &&
      country === undefined &&
      postalCode === undefined
    ) {
      return undefined;
    }

    return new Address({
      line1: addressLine1 ?? '',
      city: city ?? '',
      country: country ?? '',
      postalCode: postalCode ?? '',
    });
  }
}
