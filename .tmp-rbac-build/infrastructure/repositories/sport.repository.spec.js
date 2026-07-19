"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const persistence_1 = require("../persistence");
const sport_repository_1 = require("./sport.repository");
const sport = new domain_1.Sport({ name: 'Football' }, new domain_1.UniqueEntityId('sport-1'));
const document = { id: 'sport-1', name: 'Football' };
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
        find: jest.fn().mockReturnValue(collectionQuery),
        findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    };
};
describe('SportRepository', () => {
    it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
        const model = createModel();
        const repository = new sport_repository_1.SportRepository(model);
        await expect(repository.create(sport)).resolves.toBeInstanceOf(domain_1.Sport);
        await expect(repository.findById(new domain_1.UniqueEntityId('sport-1'))).resolves.toBeInstanceOf(domain_1.Sport);
        await expect(repository.findAll()).resolves.toHaveLength(1);
        await expect(repository.update(new domain_1.UniqueEntityId('sport-1'), sport)).resolves.toBeInstanceOf(domain_1.Sport);
        await expect(repository.delete(new domain_1.UniqueEntityId('sport-1'))).resolves.toBeUndefined();
        expect(model.create).toHaveBeenCalledWith({ name: 'Football' });
    });
    it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
        const model = createModel();
        jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });
        await expect(new sport_repository_1.SportRepository(model).create(sport)).rejects.toBeInstanceOf(persistence_1.DuplicateEntityException);
    });
});
//# sourceMappingURL=sport.repository.spec.js.map