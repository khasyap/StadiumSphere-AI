import { Inject, Injectable } from '@nestjs/common';

import {
  Address,
  Coordinates,
  createPlatformDomainEvent,
  GeoLocation,
  TimeSlot,
  UniqueEntityId,
  Venue,
  VenueStatus,
} from '../../domain';
import { ApplicationEntityNotFoundException } from '../exceptions/application-entity-not-found.exception';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { VenueRepositoryPort } from '../interfaces/application-repository.interface';
import { VENUE_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
import { DomainEventDispatcherService } from '../platform/domain-event-dispatcher.service';

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
  public constructor(
    @Inject(VENUE_REPOSITORY) repository: VenueRepositoryPort,
    private readonly domainEventDispatcher: DomainEventDispatcherService,
  ) {
    super(repository);
  }

  public async reserve(id: string, startsAt: Date, endsAt: Date): Promise<Record<string, unknown>> {
    const venue = await this.getVenue(id);

    if (venue.status === VenueStatus.CLOSED || venue.status === VenueStatus.MAINTENANCE) {
      throw new ApplicationValidationException(`Venue cannot be reserved while ${venue.status}.`);
    }

    if (venue.status === VenueStatus.RESERVED) {
      throw new ApplicationValidationException('Venue already has an active reservation.');
    }

    return this.persist(venue, VenueStatus.RESERVED, new TimeSlot(startsAt, endsAt), 'VenueReserved');
  }

  public async release(id: string): Promise<Record<string, unknown>> {
    const venue = await this.getVenue(id);

    if (venue.status !== VenueStatus.RESERVED) {
      throw new ApplicationValidationException(`Venue cannot be released from ${venue.status}.`);
    }

    return this.persist(venue, VenueStatus.AVAILABLE, undefined, 'VenueReleased');
  }

  public async maintenance(id: string): Promise<Record<string, unknown>> {
    const venue = await this.getVenue(id);

    if (venue.status !== VenueStatus.AVAILABLE) {
      throw new ApplicationValidationException(`Venue cannot be placed into maintenance from ${venue.status}.`);
    }

    return this.persist(venue, VenueStatus.MAINTENANCE);
  }

  public async open(id: string): Promise<Record<string, unknown>> {
    const venue = await this.getVenue(id);

    if (venue.status !== VenueStatus.MAINTENANCE && venue.status !== VenueStatus.CLOSED) {
      throw new ApplicationValidationException(`Venue cannot be opened from ${venue.status}.`);
    }

    return this.persist(venue, VenueStatus.AVAILABLE);
  }

  public async close(id: string): Promise<Record<string, unknown>> {
    const venue = await this.getVenue(id);

    if (venue.status !== VenueStatus.AVAILABLE && venue.status !== VenueStatus.MAINTENANCE) {
      throw new ApplicationValidationException(`Venue cannot be closed from ${venue.status}.`);
    }

    return this.persist(venue, VenueStatus.CLOSED);
  }

  protected createEntity(command: VenueCreateCommand): Venue {
    return new Venue({
      location: this.createLocation(command),
      name: command.name,
      status: VenueStatus.AVAILABLE,
    });
  }

  protected updateEntity(current: Venue, command: VenueUpdateCommand): Venue {
    const venue = current.toJSON();
    const coordinates = venue.location.coordinates;

    const props = {
      location: new GeoLocation(
        new Coordinates(
          command.latitude ?? coordinates.latitude,
          command.longitude ?? coordinates.longitude,
        ),
        venue.location.address,
      ),
      name: command.name ?? venue.name,
      status: current.status,
    };

    return venue.reservationTimeSlot === undefined
      ? new Venue(props, current.id)
      : new Venue({ ...props, reservationTimeSlot: venue.reservationTimeSlot }, current.id);
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

  private async getVenue(id: string): Promise<Venue> {
    const venue = await this.repository.findById(new UniqueEntityId(id));

    if (venue === null) {
      throw new ApplicationEntityNotFoundException(id);
    }

    return venue;
  }

  private async persist(
    venue: Venue,
    status: VenueStatus,
    reservationTimeSlot?: TimeSlot,
    eventName?: 'VenueReleased' | 'VenueReserved',
  ): Promise<Record<string, unknown>> {
    const current = venue.toJSON();
    const props = {
      location: current.location,
      name: current.name,
      status,
    };
    const updated = await this.repository.update(
      venue.id,
      reservationTimeSlot === undefined
        ? new Venue(props, venue.id)
        : new Venue({ ...props, reservationTimeSlot }, venue.id),
    );

    if (eventName !== undefined) {
      this.domainEventDispatcher.dispatch(
        updated,
        createPlatformDomainEvent(eventName, updated.id, updated.toJSON() as Record<string, unknown>),
      );
    }

    return updated.toJSON() as Record<string, unknown>;
  }
}
