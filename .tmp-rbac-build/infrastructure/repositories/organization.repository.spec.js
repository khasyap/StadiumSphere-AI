"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const persistence_1 = require("../persistence");
const organization_repository_1 = require("./organization.repository");
const organization = new domain_1.Organization({ name: 'StadiumSphere Sports' }, new domain_1.UniqueEntityId('organization-1'));
const document = { id: 'organization-1', name: 'StadiumSphere Sports' };
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
describe('OrganizationRepository', () => {
    it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
        const model = createModel();
        const repository = new organization_repository_1.OrganizationRepository(model);
        await expect(repository.create(organization)).resolves.toBeInstanceOf(domain_1.Organization);
        await expect(repository.findById(new domain_1.UniqueEntityId('organization-1'))).resolves.toBeInstanceOf(domain_1.Organization);
        await expect(repository.findAll()).resolves.toHaveLength(1);
        await expect(repository.update(new domain_1.UniqueEntityId('organization-1'), organization)).resolves.toBeInstanceOf(domain_1.Organization);
        await expect(repository.delete(new domain_1.UniqueEntityId('organization-1'))).resolves.toBeUndefined();
        expect(model.create).toHaveBeenCalledWith({ name: 'StadiumSphere Sports' });
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith('organization-1', { $set: { name: 'StadiumSphere Sports' } }, { new: true, runValidators: true });
    });
    it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
        const model = createModel();
        jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });
        await expect(new organization_repository_1.OrganizationRepository(model).create(organization)).rejects.toBeInstanceOf(persistence_1.DuplicateEntityException);
    });
});
//# sourceMappingURL=organization.repository.spec.js.map