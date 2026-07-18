import { Inject, Injectable } from '@nestjs/common';

import { Booking } from '../../domain';
import type { BookingRepositoryPort } from '../interfaces/application-repository.interface';
import { BOOKING_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';

export interface BookingCreateCommand {
  reference: string;
}

export interface BookingUpdateCommand {
  reference?: string;
}

@Injectable()
export class BookingApplicationService extends CrudApplicationService<
  Booking,
  BookingCreateCommand,
  BookingUpdateCommand
> {
  public constructor(@Inject(BOOKING_REPOSITORY) repository: BookingRepositoryPort) {
    super(repository);
  }

  protected createEntity(command: BookingCreateCommand): Booking {
    return new Booking({ reference: command.reference });
  }

  protected updateEntity(current: Booking, command: BookingUpdateCommand): Booking {
    return new Booking({ reference: command.reference ?? current.toJSON().reference }, current.id);
  }
}
