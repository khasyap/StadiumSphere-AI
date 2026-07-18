import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import type { TeamRepositoryPort } from '../../application';
import type { Team, UniqueEntityId } from '../../domain';
import { TeamPersistenceMapper } from '../mappers/team.persistence-mapper';
import { TEAM_PERSISTENCE_MODEL } from '../schemas/team.schema';
import type { TeamPersistence } from '../schemas/team.schema';
import { MongoApplicationRepository } from './mongo-application.repository';

@Injectable()
export class TeamRepository
  extends MongoApplicationRepository<Team, TeamPersistence>
  implements TeamRepositoryPort
{
  public constructor(@InjectModel(TEAM_PERSISTENCE_MODEL) model: Model<TeamPersistence>) {
    super(model, 'Team', new TeamPersistenceMapper());
  }

  public async existsBySportId(sportId: UniqueEntityId): Promise<boolean> {
    return this.exists({ sportId: sportId.toString() });
  }
}
