import { Inject, Injectable } from '@nestjs/common';

import {
  Booking,
  BookingStatus,
  createPlatformDomainEvent,
  EventStatus,
  UniqueEntityId,
} from '../../domain';
import type { PlatformDomainEventName } from '../../domain';
import type { BookingProps } from '../../domain';
import { ApplicationEntityNotFoundException } from '../exceptions/application-entity-not-found.exception';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type {
  BookingRepositoryPort,
  EventRepositoryPort,
} from '../interfaces/application-repository.interface';
import {
  BOOKING_REPOSITORY,
  EVENT_REPOSITORY,
} from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
import { DomainEventDispatcherService } from '../platform/domain-event-dispatcher.service';

export interface BookingCreateCommand {
  eventId: string;
  reference: string;
}

export interface BookingUpdateCommand {
  eventId?: string;
  reference?: string;
}

@Injectable()
export class BookingApplicationService extends CrudApplicationService<
  Booking,
  BookingCreateCommand,
  BookingUpdateCommand
> {
  public constructor(
    @Inject(BOOKING_REPOSITORY) private readonly bookingRepository: BookingRepositoryPort,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepositoryPort,
    private readonly domainEventDispatcher: DomainEventDispatcherService,
  ) {
    super(bookingRepository);
  }

  public override async create(command: BookingCreateCommand): Promise<Record<string, unknown>> {
    await this.ensureBookableEvent(command.eventId);
    const created = await this.bookingRepository.create(this.createEntity(command));
    this.publish(created, 'BookingCreated');
    return created.toJSON() as Record<string, unknown>;
  }

  public override async update(
    id: string,
    command: BookingUpdateCommand,
  ): Promise<Record<string, unknown>> {
    const booking = await this.getBooking(id);

    if (
      booking.status === BookingStatus.COMPLETED &&
      (command.eventId !== undefined || command.reference !== undefined)
    ) {
      throw new ApplicationValidationException('Completed bookings cannot be updated.');
    }

    if (command.eventId !== undefined && command.eventId !== booking.eventId.toString()) {
      await this.ensureBookableEvent(command.eventId);
    }

    return super.update(id, command);
  }

  public async confirm(id: string): Promise<Record<string, unknown>> {
    const booking = await this.getBooking(id);
    this.ensureTransition(booking.status, BookingStatus.PENDING, 'confirm');
    await this.ensureBookableEvent(booking.eventId.toString());
    return this.toWorkflowResponse(await this.persistStatus(booking, BookingStatus.CONFIRMED, 'BookingConfirmed'));
  }

  public async cancel(id: string): Promise<Record<string, unknown>> {
    const booking = await this.getBooking(id);

    if (booking.status !== BookingStatus.PENDING && booking.status !== BookingStatus.CONFIRMED) {
      throw new ApplicationValidationException(`Booking cannot be cancelled from ${booking.status}.`);
    }

    return this.toWorkflowResponse(await this.persistStatus(booking, BookingStatus.CANCELLED, 'BookingCancelled'));
  }

  public async checkIn(id: string): Promise<Record<string, unknown>> {
    const booking = await this.getBooking(id);
    this.ensureTransition(booking.status, BookingStatus.CONFIRMED, 'check in');
    return this.toWorkflowResponse(await this.persistStatus(booking, BookingStatus.CHECKED_IN));
  }

  public async complete(id: string): Promise<Record<string, unknown>> {
    const booking = await this.getBooking(id);
    this.ensureTransition(booking.status, BookingStatus.CHECKED_IN, 'complete');
    return this.toWorkflowResponse(await this.persistStatus(booking, BookingStatus.COMPLETED, 'BookingCompleted'));
  }

  protected createEntity(command: BookingCreateCommand): Booking {
    return new Booking({
      eventId: command.eventId,
      reference: command.reference,
      status: BookingStatus.PENDING,
    });
  }

  protected updateEntity(current: Booking, command: BookingUpdateCommand): Booking {
    return this.withProperties(current, {
      eventId: command.eventId ?? current.eventId.toString(),
      reference: command.reference ?? current.toJSON().reference,
      status: current.status,
    });
  }

  private async ensureBookableEvent(eventId: string): Promise<void> {
    const event = await this.eventRepository.findById(new UniqueEntityId(eventId));

    if (event === null) {
      throw new ApplicationEntityNotFoundException(eventId);
    }

    if (event.status === EventStatus.CANCELLED || event.status === EventStatus.FINISHED) {
      throw new ApplicationValidationException(`Bookings are not available for ${event.status} events.`);
    }
  }

  private ensureTransition(current: BookingStatus, expected: BookingStatus, action: string): void {
    if (current !== expected) {
      throw new ApplicationValidationException(`Booking cannot ${action} from ${current}.`);
    }
  }

  private async getBooking(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findById(new UniqueEntityId(id));

    if (booking === null) {
      throw new ApplicationEntityNotFoundException(id);
    }

    return booking;
  }

  private async persistStatus(
    booking: Booking,
    status: BookingStatus,
    eventName?: PlatformDomainEventName,
  ): Promise<Booking> {
    const updated = await this.bookingRepository.update(booking.id, this.withProperties(booking, { status }));

    if (eventName !== undefined) {
      this.publish(updated, eventName);
    }

    return updated;
  }

  private toWorkflowResponse(booking: Booking): Record<string, unknown> {
    return booking.toJSON() as Record<string, unknown>;
  }

  private withProperties(booking: Booking, changes: Partial<BookingProps>): Booking {
    const current = booking.toJSON();
    return new Booking(
      {
        eventId: changes.eventId ?? current.eventId,
        reference: changes.reference ?? current.reference,
        status: changes.status ?? booking.status,
      },
      booking.id,
    );
  }

  private publish(booking: Booking, name: PlatformDomainEventName): void {
    this.domainEventDispatcher.dispatch(
      booking,
      createPlatformDomainEvent(name, booking.id, booking.toJSON() as Record<string, unknown>),
    );
  }
}
