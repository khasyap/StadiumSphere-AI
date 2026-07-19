"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const persistence_1 = require("../persistence");
const team_repository_1 = require("./team.repository");
const team = new domain_1.Team({ name: 'StadiumSphere FC', sport: new domain_1.Sport({ name: 'Football' }, new domain_1.UniqueEntityId('sport-1')) }, new domain_1.UniqueEntityId('team-1'));
const document = { id: 'team-1', name: 'StadiumSphere FC', sportId: 'sport-1', sportName: 'Football' };
const createModel = () => {
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
        exists: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(true) }),
        find: jest.fn().mockReturnValue(collectionQuery),
        findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    };
};
describe('TeamRepository', () => {
    it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
        const model = createModel();
        const repository = new team_repository_1.TeamRepository(model);
        await expect(repository.create(team)).resolves.toBeInstanceOf(domain_1.Team);
        await expect(repository.findById(new domain_1.UniqueEntityId('team-1'))).resolves.toBeInstanceOf(domain_1.Team);
        await expect(repository.findAll()).resolves.toHaveLength(1);
        await expect(repository.update(new domain_1.UniqueEntityId('team-1'), team)).resolves.toBeInstanceOf(domain_1.Team);
        await expect(repository.delete(new domain_1.UniqueEntityId('team-1'))).resolves.toBeUndefined();
        expect(model.create).toHaveBeenCalledWith({
            name: 'StadiumSphere FC',
            sportId: 'sport-1',
            sportName: 'Football',
        });
    });
    it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
        const model = createModel();
        jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });
        await expect(new team_repository_1.TeamRepository(model).create(team)).rejects.toBeInstanceOf(persistence_1.DuplicateEntityException);
    });
    it('checks Team references through the shared repository infrastructure', async () => {
        const model = createModel();
        await expect(new team_repository_1.TeamRepository(model).existsBySportId(new domain_1.UniqueEntityId('sport-1'))).resolves.toBe(true);
        expect(model.exists).toHaveBeenCalledWith({ sportId: 'sport-1' });
    });
});
//# sourceMappingURL=team.repository.spec.js.map