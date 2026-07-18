import type { Model } from 'mongoose';

import { Sport, Team, UniqueEntityId } from '../../domain';
import { DuplicateEntityException } from '../persistence';
import type { TeamPersistence } from '../schemas/team.schema';
import { TeamRepository } from './team.repository';

const team = new Team(
  { name: 'StadiumSphere FC', sport: new Sport({ name: 'Football' }, new UniqueEntityId('sport-1')) },
  new UniqueEntityId('team-1'),
);
const document = { id: 'team-1', name: 'StadiumSphere FC', sportId: 'sport-1', sportName: 'Football' };

const createModel = (): Model<TeamPersistence> => {
  const collectionQuery = {
    exec: jest.fn().mockResolvedValue([document]),
    limit: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
  };

  return {
    countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(1) }),
    create: jest.fn().mockResolvedValue(document),
    find: jest.fn().mockReturnValue(collectionQuery),
    findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
  } as unknown as Model<TeamPersistence>;
};

describe('TeamRepository', () => {
  it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
    const model = createModel();
    const repository = new TeamRepository(model);

    await expect(repository.create(team)).resolves.toBeInstanceOf(Team);
    await expect(repository.findById(new UniqueEntityId('team-1'))).resolves.toBeInstanceOf(Team);
    await expect(repository.findAll()).resolves.toHaveLength(1);
    await expect(repository.update(new UniqueEntityId('team-1'), team)).resolves.toBeInstanceOf(Team);
    await expect(repository.delete(new UniqueEntityId('team-1'))).resolves.toBeUndefined();

    expect(model.create).toHaveBeenCalledWith({
      name: 'StadiumSphere FC',
      sportId: 'sport-1',
      sportName: 'Football',
    });
  });

  it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
    const model = createModel();
    jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });

    await expect(new TeamRepository(model).create(team)).rejects.toBeInstanceOf(DuplicateEntityException);
  });
});
