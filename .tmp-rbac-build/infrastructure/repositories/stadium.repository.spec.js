"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const persistence_1 = require("../persistence");
const stadium_repository_1 = require("./stadium.repository");
const stadium = new domain_1.Stadium({ capacity: new domain_1.Capacity(50000), name: 'StadiumSphere Arena' }, new domain_1.UniqueEntityId('stadium-1'));
const document = { id: 'stadium-1', capacity: 50000, name: 'StadiumSphere Arena' };
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
describe('StadiumRepository', () => {
    it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
        const model = createModel();
        const repository = new stadium_repository_1.StadiumRepository(model);
        await expect(repository.create(stadium)).resolves.toBeInstanceOf(domain_1.Stadium);
        await expect(repository.findById(new domain_1.UniqueEntityId('stadium-1'))).resolves.toBeInstanceOf(domain_1.Stadium);
        await expect(repository.findAll()).resolves.toHaveLength(1);
        await expect(repository.update(new domain_1.UniqueEntityId('stadium-1'), stadium)).resolves.toBeInstanceOf(domain_1.Stadium);
        await expect(repository.delete(new domain_1.UniqueEntityId('stadium-1'))).resolves.toBeUndefined();
        expect(model.create).toHaveBeenCalledWith({ capacity: 50000, name: 'StadiumSphere Arena' });
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith('stadium-1', { $set: { capacity: 50000, name: 'StadiumSphere Arena' } }, { new: true, runValidators: true });
    });
    it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
        const model = createModel();
        jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });
        await expect(new stadium_repository_1.StadiumRepository(model).create(stadium)).rejects.toBeInstanceOf(persistence_1.DuplicateEntityException);
    });
});
//# sourceMappingURL=stadium.repository.spec.js.map