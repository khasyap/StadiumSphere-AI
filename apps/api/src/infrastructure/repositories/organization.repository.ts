import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import type { OrganizationRepositoryPort } from '../../application';
import type { Organization } from '../../domain';
import { OrganizationPersistenceMapper } from '../mappers/organization.persistence-mapper';
import { ORGANIZATION_PERSISTENCE_MODEL } from '../schemas/organization.schema';
import type { OrganizationPersistence } from '../schemas/organization.schema';
import { MongoApplicationRepository } from './mongo-application.repository';

@Injectable()
export class OrganizationRepository
  extends MongoApplicationRepository<Organization, OrganizationPersistence>
  implements OrganizationRepositoryPort
{
  public constructor(
    @InjectModel(ORGANIZATION_PERSISTENCE_MODEL) model: Model<OrganizationPersistence>,
  ) {
    super(model, 'Organization', new OrganizationPersistenceMapper());
  }
}
