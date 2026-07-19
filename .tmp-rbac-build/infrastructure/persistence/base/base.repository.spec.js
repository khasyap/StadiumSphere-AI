"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const duplicate_entity_exception_1 = require("../exceptions/duplicate-entity.exception");
const entity_not_found_exception_1 = require("../exceptions/entity-not-found.exception");
const persistence_exception_1 = require("../exceptions/persistence.exception");
const base_repository_1 = require("./base.repository");
class ExampleRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model, 'ExampleEntity');
    }
}
describe('BaseRepository', () => {
    it('applies generic filters, sorting, pagination, projection, and population', async () => {
        const document = { active: true, name: 'Arena' };
        const query = {
            exec: jest.fn().mockResolvedValue([document]),
            limit: jest.fn().mockReturnThis(),
            populate: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
        };
        const model = {
            countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(3) }),
            find: jest.fn().mockReturnValue(query),
        };
        const repository = new ExampleRepository(model);
        const result = await repository.findMany({
            filter: { active: true },
            pagination: { limit: 2, page: 2 },
            population: { path: 'owner' },
            projection: { name: 1 },
            sort: { name: 'asc' },
        });
        expect(model.find).toHaveBeenCalledWith({ active: true });
        expect(query.select).toHaveBeenCalledWith({ name: 1 });
        expect(query.populate).toHaveBeenCalledWith({ path: 'owner' });
        expect(query.skip).toHaveBeenCalledWith(2);
        expect(query.limit).toHaveBeenCalledWith(2);
        expect(query.sort).toHaveBeenCalledWith({ name: 1 });
        expect(result).toMatchObject({ hasNext: false, page: 2, total: 3, totalPages: 2 });
    });
    it('maps duplicate-key and missing-entity failures to persistence exceptions', async () => {
        const duplicateModel = {
            create: jest.fn().mockRejectedValue({ code: 11_000 }),
        };
        const missingModel = {
            findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
        };
        await expect(new ExampleRepository(duplicateModel).create({ name: 'Arena' })).rejects.toBeInstanceOf(duplicate_entity_exception_1.DuplicateEntityException);
        await expect(new ExampleRepository(missingModel).update('example-id', { $set: { name: 'Arena' } })).rejects.toBeInstanceOf(entity_not_found_exception_1.EntityNotFoundException);
    });
    it('maps read failures to a persistence exception', async () => {
        const query = {
            exec: jest.fn().mockRejectedValue(new Error('MongoDB is unavailable')),
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
        };
        const model = {
            countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(0) }),
            find: jest.fn().mockReturnValue(query),
        };
        await expect(new ExampleRepository(model).findMany()).rejects.toEqual(new persistence_exception_1.PersistenceException('Unable to find ExampleEntity.'));
    });
});
//# sourceMappingURL=base.repository.spec.js.map