import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import type { EventRepositoryPort } from '../../application';
import type { Event } from '../../domain';
import { EventPersistenceMapper } from '../mappers/event.persistence-mapper';
import { EVENT_PERSISTENCE_MODEL } from '../schemas/event.schema';
import type { EventPersistence } from '../schemas/event.schema';
import { MongoApplicationRepository } from './mongo-application.repository';

@Injectable()
export class EventRepository
  extends MongoApplicationRepository<Event, EventPersistence>
  implements EventRepositoryPort
{
  public constructor(@InjectModel(EVENT_PERSISTENCE_MODEL) model: Model<EventPersistence>) {
    super(model, 'Event', new EventPersistenceMapper());
  }
}
