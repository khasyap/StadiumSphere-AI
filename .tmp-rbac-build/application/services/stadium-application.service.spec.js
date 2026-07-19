"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const stadium_application_service_1 = require("./stadium-application.service");
describe('StadiumApplicationService', () => {
    const stadium = new domain_1.Stadium({ capacity: new domain_1.Capacity(50000), name: 'StadiumSphere Arena' }, new domain_1.UniqueEntityId('stadium-1'));
    const repository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [stadium]),
        findById: jest.fn(async (_id) => stadium),
        update: jest.fn(async (_id, entity) => entity),
    };
    const service = new stadium_application_service_1.StadiumApplicationService(repository);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('coordinates create, read, update, and delete through its repository port', async () => {
        await expect(service.create({ capacity: 60000, name: 'New Stadium' })).resolves.toMatchObject({
            id: expect.any(String),
        });
        await expect(service.findAll()).resolves.toHaveLength(1);
        await expect(service.findById('stadium-1')).resolves.toMatchObject({ id: 'stadium-1' });
        await expect(service.update('stadium-1', { capacity: 55000, name: 'Updated Stadium' })).resolves.toMatchObject({
            id: 'stadium-1',
        });
        await expect(service.delete('stadium-1')).resolves.toBeUndefined();
        expect(repository.create).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(new domain_1.UniqueEntityId('stadium-1'));
    });
});
//# sourceMappingURL=stadium-application.service.spec.js.map