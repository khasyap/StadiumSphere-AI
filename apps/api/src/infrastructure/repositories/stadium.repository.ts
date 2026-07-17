import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import type { StadiumRepositoryPort } from '../../application';
import type { Stadium } from '../../domain';
import { StadiumPersistenceMapper } from '../mappers/stadium.persistence-mapper';
import { STADIUM_PERSISTENCE_MODEL } from '../schemas/stadium.schema';
import type { StadiumPersistence } from '../schemas/stadium.schema';
import { MongoApplicationRepository } from './mongo-application.repository';

@Injectable()
export class StadiumRepository
  extends MongoApplicationRepository<Stadium, StadiumPersistence>
  implements StadiumRepositoryPort
{
  public constructor(@InjectModel(STADIUM_PERSISTENCE_MODEL) model: Model<StadiumPersistence>) {
    super(model, 'Stadium', new StadiumPersistenceMapper());
  }
}
