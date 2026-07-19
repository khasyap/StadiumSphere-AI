import { Inject, Injectable } from '@nestjs/common';

import { Capacity, createPlatformDomainEvent, Stadium, StadiumStatus, UniqueEntityId } from '../../domain';
import { ApplicationEntityNotFoundException } from '../exceptions/application-entity-not-found.exception';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { StadiumRepositoryPort } from '../interfaces/application-repository.interface';
import { STADIUM_REPOSITORY } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
import { DomainEventDispatcherService } from '../platform/domain-event-dispatcher.service';

export interface StadiumCreateCommand {
  capacity: number;
  name: string;
}

export interface StadiumUpdateCommand {
  capacity?: number;
  name?: string;
}

@Injectable()
export class StadiumApplicationService extends CrudApplicationService<
  Stadium,
  StadiumCreateCommand,
  StadiumUpdateCommand
> {
  public constructor(
    @Inject(STADIUM_REPOSITORY) repository: StadiumRepositoryPort,
    private readonly domainEventDispatcher: DomainEventDispatcherService,
  ) {
    super(repository);
  }

  public async open(id: string): Promise<Record<string, unknown>> {
    const stadium = await this.getStadium(id);

    if (stadium.status !== StadiumStatus.CLOSED && stadium.status !== StadiumStatus.MAINTENANCE) {
      throw new ApplicationValidationException(`Stadium cannot open from ${stadium.status}.`);
    }

    return this.persistStatus(stadium, StadiumStatus.AVAILABLE, 'StadiumOpened');
  }

  public async close(id: string): Promise<Record<string, unknown>> {
    const stadium = await this.getStadium(id);

    if (stadium.status === StadiumStatus.CLOSED) {
      throw new ApplicationValidationException('Stadium is already closed.');
    }

    return this.persistStatus(stadium, StadiumStatus.CLOSED, 'StadiumClosed');
  }

  public async maintenance(id: string): Promise<Record<string, unknown>> {
    return this.transition(id, StadiumStatus.MAINTENANCE, 'place into maintenance');
  }

  protected createEntity(command: StadiumCreateCommand): Stadium {
    return new Stadium({
      capacity: new Capacity(command.capacity),
      name: command.name,
      status: StadiumStatus.AVAILABLE,
    });
  }

  protected updateEntity(current: Stadium, command: StadiumUpdateCommand): Stadium {
    const stadium = current.toJSON();
    return new Stadium(
      {
        capacity: new Capacity(command.capacity ?? stadium.capacity.value),
        name: command.name ?? stadium.name,
        status: current.status,
      },
      current.id,
    );
  }

  private async getStadium(id: string): Promise<Stadium> {
    const stadium = await this.repository.findById(new UniqueEntityId(id));

    if (stadium === null) {
      throw new ApplicationEntityNotFoundException(id);
    }

    return stadium;
  }

  private async transition(
    id: string,
    next: StadiumStatus,
    action: string,
  ): Promise<Record<string, unknown>> {
    const stadium = await this.getStadium(id);

    if (stadium.status !== StadiumStatus.AVAILABLE) {
      throw new ApplicationValidationException(`Stadium cannot ${action} from ${stadium.status}.`);
    }

    return this.persistStatus(stadium, next);
  }

  private async persistStatus(
    stadium: Stadium,
    status: StadiumStatus,
    eventName?: 'StadiumClosed' | 'StadiumOpened',
  ): Promise<Record<string, unknown>> {
    const current = stadium.toJSON();
    const updated = await this.repository.update(
      stadium.id,
      new Stadium({ capacity: current.capacity, name: current.name, status }, stadium.id),
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
