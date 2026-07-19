"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const organization_application_service_1 = require("./organization-application.service");
describe('OrganizationApplicationService', () => {
    const organization = new domain_1.Organization({ name: 'StadiumSphere Sports' }, new domain_1.UniqueEntityId('organization-1'));
    const repository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [organization]),
        findById: jest.fn(async (_id) => organization),
        update: jest.fn(async (_id, entity) => entity),
    };
    const service = new organization_application_service_1.OrganizationApplicationService(repository);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('coordinates create, read, update, and delete through its repository port', async () => {
        await expect(service.create({ name: 'New Organization' })).resolves.toMatchObject({
            id: expect.any(String),
        });
        await expect(service.findAll()).resolves.toHaveLength(1);
        await expect(service.findById('organization-1')).resolves.toMatchObject({
            id: 'organization-1',
        });
        await expect(service.update('organization-1', { name: 'Updated Organization' })).resolves.toMatchObject({
            id: 'organization-1',
        });
        await expect(service.delete('organization-1')).resolves.toBeUndefined();
        expect(repository.create).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(new domain_1.UniqueEntityId('organization-1'));
    });
});
//# sourceMappingURL=organization-application.service.spec.js.map