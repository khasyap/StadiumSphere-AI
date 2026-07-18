import { Inject, Injectable } from '@nestjs/common';

import { Event, TimeSlot } from '../../domain';
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
  public constructor(@Inject(EVENT_REPOSITORY) repository: EventRepositoryPort) {
    super(repository);
  }

  protected createEntity(command: EventCreateCommand): Event {
    return new Event({
      name: command.name,
      timeSlot: new TimeSlot(command.startsAt, command.endsAt),
    });
  }

  protected updateEntity(current: Event, command: EventUpdateCommand): Event {
    const event = current.toJSON();

    return new Event(
      {
        name: command.name ?? event.name,
        timeSlot: new TimeSlot(
          command.startsAt ?? event.timeSlot.startsAt,
          command.endsAt ?? event.timeSlot.endsAt,
        ),
      },
      current.id,
    );
  }
}
