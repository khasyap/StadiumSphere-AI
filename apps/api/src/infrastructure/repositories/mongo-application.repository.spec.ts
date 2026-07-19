import type { Model } from 'mongoose';

import { Entity, UniqueEntityId } from '../../domain';
import type { PersistenceMapper, PersistenceRecord } from '../mappers/persistence-mapper.interface';
import { MongoApplicationRepository } from './mongo-application.repository';

interface TestPersistence {
  name: string;
}

class TestEntity extends Entity<TestPersistence> {
  public constructor(props: TestPersistence, id?: UniqueEntityId) {
    super(props, id);
  }
}

class TestPersistenceMapper implements PersistenceMapper<TestEntity, TestPersistence> {
  public toDomain(document: PersistenceRecord<TestPersistence>): TestEntity {
    return new TestEntity({ name: document.name }, new UniqueEntityId(document.id));
  }

  public toPersistence(entity: TestEntity): Partial<TestPersistence> {
    return { name: entity.toJSON().name };
  }
}

class TestRepository extends MongoApplicationRepository<TestEntity, TestPersistence> {
  public constructor(model: Model<TestPersistence>) {
    super(model, 'Test', new TestPersistenceMapper());
  }
}

describe('MongoApplicationRepository', () => {
  it('materializes Mongoose documents before mapping list entities to complete responses', async () => {
    const createdAt = new Date('2026-07-19T08:00:00.000Z');
    const updatedAt = new Date('2026-07-19T09:00:00.000Z');
    const document = {
      toObject: jest.fn(() => ({
        _id: { toString: () => 'organization-1' },
        createdAt,
        name: 'StadiumSphere Sports',
        updatedAt,
      })),
    };
    Object.defineProperty(document, '_id', {
      enumerable: false,
      value: { toString: () => 'organization-1' },
    });
    Object.defineProperty(document, 'name', { enumerable: false, value: 'StadiumSphere Sports' });

    const query = {
      exec: jest.fn().mockResolvedValue([document]),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
    };
    const model = {
      countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(1) }),
      find: jest.fn().mockReturnValue(query),
    } as unknown as Model<TestPersistence>;

    const [entity] = await new TestRepository(model).findAll();

    expect(document.toObject).toHaveBeenCalledTimes(1);
    expect(entity?.toJSON()).toEqual({
      createdAt,
      id: 'organization-1',
      name: 'StadiumSphere Sports',
      updatedAt,
    });
  });
});
