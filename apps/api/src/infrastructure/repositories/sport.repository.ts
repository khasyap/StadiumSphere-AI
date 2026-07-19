import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import type { SportRepositoryPort } from '../../application';
import type { Sport } from '../../domain';
import { SportPersistenceMapper } from '../mappers/sport.persistence-mapper';
import { SPORT_PERSISTENCE_MODEL } from '../schemas/sport.schema';
import type { SportPersistence } from '../schemas/sport.schema';
import { MongoApplicationRepository } from './mongo-application.repository';

@Injectable()
export class SportRepository
  extends MongoApplicationRepository<Sport, SportPersistence>
  implements SportRepositoryPort
{
  public constructor(@InjectModel(SPORT_PERSISTENCE_MODEL) model: Model<SportPersistence>) {
    super(model, 'Sport', new SportPersistenceMapper());
  }

  public async findByName(name: string): Promise<Sport | null> {
    return this.findOne({ name });
  }
}
