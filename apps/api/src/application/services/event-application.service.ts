import { Inject, Injectable } from '@nestjs/common';

import { Event, EventStatus, TimeSlot, UniqueEntityId } from '../../domain';
import { ApplicationEntityNotFoundException } from '../exceptions/application-entity-not-found.exception';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { EventRepositoryPort } from '../interfaces/application-repository.interface';
import { EVENT_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';

export interface EventCreateCommand {
  endsAt: Date;
  name: string;
  startsAt: Date;
}

export interface EventUpdateCommand {
  endsAt?: Date;
  name?: string;
  startsAt?: Date;
}

@Injectable()
export class EventApplicationService extends CrudApplicationService<
  Event,
  EventCreateCommand,
  EventUpdateCommand
> {
  public constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepositoryPort) {
    super(eventRepository);
  }

  public override async create(command: EventCreateCommand): Promise<Record<string, unknown>> {
    const timeSlot = this.createTimeSlot(command.startsAt, command.endsAt);
    await this.ensureScheduleAvailable(timeSlot);
    return super.create(command);
  }

  public override async update(
    id: string,
    command: EventUpdateCommand,
  ): Promise<Record<string, unknown>> {
    const event = await this.getEvent(id);
    const current = event.toJSON();

    if (event.status === EventStatus.FINISHED) {
      throw new ApplicationValidationException('Finished events cannot be updated.');
    }

    if (command.startsAt !== undefined || command.endsAt !== undefined) {
      const timeSlot = this.createTimeSlot(
        command.startsAt ?? current.timeSlot.startsAt,
        command.endsAt ?? current.timeSlot.endsAt,
      );

      if (
        timeSlot.startsAt.getTime() !== current.timeSlot.startsAt.getTime() ||
        timeSlot.endsAt.getTime() !== current.timeSlot.endsAt.getTime()
      ) {
        await this.ensureScheduleAvailable(timeSlot);
      }
    }

    return super.update(id, command);
  }

  public async start(id: string): Promise<Record<string, unknown>> {
    return this.transition(id, EventStatus.SCHEDULED, EventStatus.LIVE, 'start');
  }

  public async finish(id: string): Promise<Record<string, unknown>> {
    return this.transition(id, EventStatus.LIVE, EventStatus.FINISHED, 'finish');
  }

  public async cancel(id: string): Promise<Record<string, unknown>> {
    return this.transition(id, EventStatus.SCHEDULED, EventStatus.CANCELLED, 'cancel');
  }

  protected createEntity(command: EventCreateCommand): Event {
    return new Event({
      name: command.name,
      status: EventStatus.SCHEDULED,
      timeSlot: new TimeSlot(command.startsAt, command.endsAt),
    });
  }

  protected updateEntity(current: Event, command: EventUpdateCommand): Event {
    const event = current.toJSON();
    return new Event(
      {
        name: command.name ?? event.name,
        status: current.status,
        timeSlot: new TimeSlot(
          command.startsAt ?? event.timeSlot.startsAt,
          command.endsAt ?? event.timeSlot.endsAt,
        ),
      },
      current.id,
    );
  }

  private createTimeSlot(startsAt: Date, endsAt: Date): TimeSlot {
    const timeSlot = new TimeSlot(startsAt, endsAt);

    if (timeSlot.startsAt.getTime() <= Date.now()) {
      throw new ApplicationValidationException('Events cannot be scheduled in the past.');
    }

    return timeSlot;
  }

  private async ensureScheduleAvailable(timeSlot: TimeSlot): Promise<void> {
    if (await this.eventRepository.existsByTimeSlot(timeSlot)) {
      throw new ApplicationValidationException('An event is already scheduled for this time slot.');
    }
  }

  private async getEvent(id: string): Promise<Event> {
    const event = await this.eventRepository.findById(new UniqueEntityId(id));

    if (event === null) {
      throw new ApplicationEntityNotFoundException(id);
    }

    return event;
  }

  private async transition(
    id: string,
    expected: EventStatus,
    next: EventStatus,
    action: string,
  ): Promise<Record<string, unknown>> {
    const event = await this.getEvent(id);

    if (event.status !== expected) {
      throw new ApplicationValidationException(`Event cannot ${action} from ${event.status}.`);
    }

    const updated = await this.eventRepository.update(
      event.id,
      new Event(
        { name: event.toJSON().name, status: next, timeSlot: event.toJSON().timeSlot },
        event.id,
      ),
    );

    return updated.toJSON() as Record<string, unknown>;
  }
}
