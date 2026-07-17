import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import type { VenueRepositoryPort } from '../../application';
import type { Venue } from '../../domain';
import { VenuePersistenceMapper } from '../mappers/venue.persistence-mapper';
import { VENUE_PERSISTENCE_MODEL } from '../schemas/venue.schema';
import type { VenuePersistence } from '../schemas/venue.schema';
import { MongoApplicationRepository } from './mongo-application.repository';

@Injectable()
export class VenueRepository
  extends MongoApplicationRepository<Venue, VenuePersistence>
  implements VenueRepositoryPort
{
  public constructor(@InjectModel(VENUE_PERSISTENCE_MODEL) model: Model<VenuePersistence>) {
    super(model, 'Venue', new VenuePersistenceMapper());
  }
}
