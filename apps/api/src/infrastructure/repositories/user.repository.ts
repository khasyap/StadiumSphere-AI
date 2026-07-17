import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import type { Model } from 'mongoose';

import type { UserRepositoryPort } from '../../application';
import type { User } from '../../domain';
import { UserPersistenceMapper } from '../mappers/user.persistence-mapper';
import { USER_PERSISTENCE_MODEL } from '../schemas/user.schema';
import type { UserPersistence } from '../schemas/user.schema';
import { MongoApplicationRepository } from './mongo-application.repository';

@Injectable()
export class UserRepository
  extends MongoApplicationRepository<User, UserPersistence>
  implements UserRepositoryPort
{
  public constructor(@InjectModel(USER_PERSISTENCE_MODEL) model: Model<UserPersistence>) {
    super(model, 'User', new UserPersistenceMapper());
  }
}
